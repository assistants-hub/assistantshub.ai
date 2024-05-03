import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getGroqObjectForAssistant } from '@/app/api/utils';
import { ulid } from 'ulidx';

const prisma = new PrismaClient();

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

const createMessage = async (
  assistantId: string,
  threadId: string,
  msgId: string,
  buffer: string
) => {
  let object = {
    id: msgId,
    role: 'assistant',
    content: [
      {
        type: 'text',
        text: {
          value: buffer,
          annotations: [],
        },
      },
    ],
    created_at: Math.floor(new Date().getTime() / 1000),
  };
  // Save the message to the database
  let message = await prisma.message.upsert({
    where: {
      id: msgId,
    },
    update: {
      id: msgId,
      threadId: threadId,
      object: object,
    },
    create: {
      id: msgId,
      threadId: threadId,
      object: object,
    },
  });

  // add the metric event for Message creation
  await prisma.metric.create({
    data: {
      assistantId: assistantId ? assistantId : 'unknown',
      name: 'MESSAGE_CREATED',
      value: 1,
      time: new Date(message.created_at),
      tags: message as any,
    },
  });
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

    const groq = await getGroqObjectForAssistant(req, prisma);
    let chatParams = await formatChatParams(
      threadId,
      assistant.modelId,
      assistant.object.instructions
    );
    let completionResponse = await groq.chat.completions.create(chatParams);

    let msgId = 'msg_' + ulid();

    let buffer = '';
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completionResponse) {
            if (!chunk.choices[0].finish_reason) {
              buffer += chunk.choices[0].delta.content;
              controller.enqueue(chunk.choices[0].delta.content);
            } else {
              // Check to see if there are errors in the response
              if (chunk.x_groq && chunk.x_groq.error) {
                if (chunk.x_groq.error === 'over_capacity') {
                  controller.enqueue(
                    'Sorry I am over capacity right now, please try again later'
                  );
                }
              }
              controller.close();
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
      },
    });

    return new Response(stream);
  } catch (err: any) {
    console.log(err);
    return Response.json({ message: err.message }, { status: err.status });
  }
}
