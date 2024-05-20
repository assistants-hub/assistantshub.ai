import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import prisma from '@/app/api/utils/prisma';

export const getOpenAIObjectForAssistant = async (req: NextRequest) => {
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
