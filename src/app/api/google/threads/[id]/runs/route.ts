import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getGoogleGenAIObjectForAssistant } from '@/app/api/utils';
import { GenerateContentStreamResult } from '@google/generative-ai';
import { ulid } from 'ulidx';

const prisma = new PrismaClient();

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-2, 1)[0];
};

const formatChatParams = () => {
  return {
    history: [
      {
        role: 'user',
        parts: [{ text: 'Hello, I have 2 dogs in my house.' }],
      },
      {
        role: 'model',
        parts: [{ text: 'Great to meet you. What would you like to know?' }],
      },
    ],
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

    const genAIModel = await getGoogleGenAIObjectForAssistant(req, prisma);

    const chat = genAIModel.startChat(formatChatParams()); // TODO build instructions and get the history here

    const msg = 'How many paws are in my house?'; // TODO get the latest message instead of the hardcoded one
    const runResponse: GenerateContentStreamResult =
      await chat.sendMessageStream(msg);

    let msgId = 'msg_' + ulid();

    let buffer = '';
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of runResponse.stream) {
            buffer += chunk.text();
            controller.enqueue(chunk.text());
          }
          controller.close();

          await createMessage(
            assistantId ? assistantId : '',
            threadId,
            msgId,
            buffer
          );
        } catch (error) {
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
