import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

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
      organization: true,
    },
  });

  if (!assistant) {
    throw new Error('Assistant does not exist');
  }

  return new OpenAI({
    apiKey: assistant?.organization?.openAIApiKey,
  });
};