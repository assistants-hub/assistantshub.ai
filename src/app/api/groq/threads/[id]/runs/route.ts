import { NextRequest, NextResponse } from 'next/server';
import { ulid } from 'ulidx';
import { createMessage } from '@/app/api/utils/messages';
import { Groq } from 'groq-sdk';
import prisma from '@/app/api/utils/prisma';

const getGroqObjectForAssistant = async (
  req: NextRequest
) => {
  let assistantId = req.headers.get('X-Assistant-Id');

  // @ts-ignore
  let assistant = await prisma.assistant.findFirst({
    where: {
      id: assistantId ? assistantId : undefined,
    },
    select: {
      organization: true,
      modelId: true,
      object: true,
    },
  });

  if (!assistant) {
    throw new Error('Assistant does not exist');
  }

  return new Groq({
    apiKey: assistant?.organization?.groqCloudApiKey,
  });
};

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-2, 1)[0];
};

const formatChatParams = async (
  threadId: string,
  modelId: string,
  systemInstructions: string
) => {
  let messages = await prisma.message.findMany({
    where: {
      threadId: threadId,
    },
    select: {
      object: true,
    },
    orderBy: {
      created_at: 'asc',
    },
  });

  let history = [];
  history.push({
    role: 'system',
    content: systemInstructions,
  });

  let previousRole = null;
  for (let i = 0; i < messages.length; i++) {
    let item = messages[i];
    // @ts-ignore
    if (previousRole === item.object.role) {
      history.pop();
    }

    history.push({
      // @ts-ignore
      role: item.object.role === 'assistant' ? 'assistant' : 'user',
      // @ts-ignore
      content: item.object.content[0].text.value,
    });

    // @ts-ignore
    previousRole = item.object.role === 'assistant' ? 'assistant' : 'user';
  }

  return {
    messages: history,
    model: modelId,
    stream: true,
  };
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    let threadId = getId(req);
    let assistantId = req.headers.get('X-Assistant-Id');

    if (!assistantId) {
      return Response.json(
        { message: 'Assistant ID is required' },
        { status: 400 }
      );
    }

    let assistant = await prisma.assistant.findFirst({
      where: {
        id: assistantId ? assistantId : undefined,
      },
      select: {
        modelId: true,
        object: true,
      },
    });

    const groq = await getGroqObjectForAssistant(req);
    let chatParams = await formatChatParams(
      threadId,
      assistant?.modelId ? assistant.modelId : '',
      // @ts-ignore
      assistant?.object?.instructions ? assistant.object.instructions : ''
    );
    let completionResponse = await groq.chat.completions.create(chatParams);

    let msgId = 'msg_' + ulid();

    let buffer = '';
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completionResponse as any) {
            if (!chunk.choices[0].finish_reason) {
              buffer += chunk.choices[0].delta.content;
              controller.enqueue(chunk.choices[0].delta.content);
            } else {
              // Check to see if there are errors in the response
              if (chunk.x_groq && chunk.x_groq.error) {
                if (chunk.x_groq.error) {
                  controller.error(chunk.x_groq.error);
                }
              }
            }
          }

          await createMessage(
            assistantId ? assistantId : '',
            threadId,
            msgId,
            buffer
          );
        } catch (error) {
          console.log(error);
          controller.error(error);
        }

        controller.close();
      },
    });

    return new Response(stream);
  } catch (err: any) {
    console.log(err);
    return Response.json({ message: err.message }, { status: err.status });
  }
}
