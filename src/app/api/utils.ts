import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';

export const getOpenAIObjectForAssistant = async (
  req: NextRequest,
  prisma: PrismaClient
) => {
  let assistantId = req.headers.get('X-Assistant-Id');

  // @ts-ignore
  let assistant = await prisma.assistant.findFirst({
    where: {
      id: assistantId ? assistantId : undefined,
    },
    include: {
      account: true,
    },
  });

  if (!assistant) {
    throw new Error('Assistant does not exist');
  }

  return new OpenAI({
    apiKey: assistant?.account?.openAIApiKey,
  });
};
