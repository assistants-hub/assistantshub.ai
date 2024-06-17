import { NextRequest, NextResponse } from 'next/server';
import { ulid } from 'ulidx';
import { createMessage } from '@/app/api/utils/messages';
import prisma from '@/app/api/utils/prisma';
import { getAnthropic } from '@/app/api/utils/anthropic';

const getAnthropicObjectForAssistant = async (req: NextRequest) => {
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
      modelProviderKey: true,
    },
  });

  if (!assistant) {
    throw new Error('Assistant does not exist');
  }

  return getAnthropic(assistant);
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
      content: item.object.content[0].text.value as string,
    });

    // @ts-ignore
    previousRole = item.object.role === 'assistant' ? 'assistant' : 'user';
  }

  return {
    messages: history,
    system: systemInstructions,
    max_tokens: 1024,
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

    const anthropic = await getAnthropicObjectForAssistant(req);
    let chatParams = await formatChatParams(
      threadId,
      assistant?.modelId ? assistant.modelId : '',
      // @ts-ignore
      assistant?.object?.instructions ? assistant.object.instructions : ''
    );
    // @ts-ignore
    let completionResponse = await anthropic.messages.create(chatParams);

    let msgId = 'msg_' + ulid();

    let buffer = '';
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completionResponse as any) {
            if (chunk.type === 'message_start') {
              // message started
            }

            if (chunk.type === 'content_block_delta') {
              if (chunk.delta.text) {
                buffer += chunk.delta.text;
                controller.enqueue(chunk.delta.text);
              } else {
                // Check to see if there are errors in the response
              }
            }

            if (chunk.type === 'message_end') {
              // message ended
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
