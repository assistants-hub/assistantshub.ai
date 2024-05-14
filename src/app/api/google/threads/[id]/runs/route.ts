import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import {
  GenerateContentStreamResult,
  GoogleGenerativeAI,
} from '@google/generative-ai';
import { ulid } from 'ulidx';
import { createMessage } from '@/app/api/utils/messages';

const prisma = new PrismaClient();

const getGoogleGenAIObjectForAssistant = async (
  req: NextRequest,
  prisma: PrismaClient
) => {
  let assistantId = req.headers.get('X-Assistant-Id');

  if (!assistantId) {
    throw new Error('Assistant ID is required');
  }

  // @ts-ignore
  let assistant = await prisma.assistant.findFirst({
    where: {
      id: assistantId,
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
  let googleAIStudioKey = assistant.organization?.googleAIStudioKey;

  if (!googleAIStudioKey) {
    throw new Error('Google AI Studio Key is required');
  }

  let modelId = assistant.modelId;
  if (!modelId) {
    throw new Error('Model ID is required');
  }

  let genAI = new GoogleGenerativeAI(googleAIStudioKey);
  return genAI.getGenerativeModel({
    model: modelId,
    systemInstruction: {
      role: 'model',
      // @ts-ignore
      parts: [{ text: assistant?.object?.instructions }],
    },
  });
};

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-2, 1)[0];
};

const getLatestMessage = async (threadId: string) => {
  let messages = await prisma.message.findMany({
    take: 1,
    where: {
      threadId: threadId,
    },
    select: {
      object: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  // @ts-ignore
  return messages[0]?.object?.content[0]?.text?.value;
};

const formatChatParams = async (threadId: string) => {
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
  for (let i = 0; i < messages.length - 1; i++) {
    // -1 to exclude the last message

    let item = messages[i];
    // @ts-ignore
    if (previousRole === item.object.role) {
      history.pop();
    }

    history.push({
      // @ts-ignore
      role: item.object.role === 'assistant' ? 'model' : 'user',
      // @ts-ignore
      parts: [{ text: item.object.content[0].text.value }],
    });

    // @ts-ignore
    previousRole = item.object.role === 'assistant' ? 'model' : 'user';
  }

  return {
    history: history,
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

    const genAIModel = await getGoogleGenAIObjectForAssistant(req, prisma);
    let chatParams = await formatChatParams(threadId);
    const chat = genAIModel.startChat(chatParams);
    let message = await getLatestMessage(threadId);
    const runResponse: GenerateContentStreamResult =
      await chat.sendMessageStream(message);

    let msgId = 'msg_' + ulid();

    let buffer = '';
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of runResponse.stream) {
            buffer += chunk.text();
            controller.enqueue(chunk.text());
          }

          await createMessage(
            assistantId ? assistantId : '',
            threadId,
            msgId,
            buffer
          );
        } catch (error) {
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
