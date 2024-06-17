import { NextRequest } from 'next/server';
import prisma from '@/app/api/utils/prisma';
import { getOpenAI } from '@/app/api/utils/openai';

export const getOpenAIObjectForAssistant = async (req: NextRequest) => {
  let assistantId = req.headers.get('X-Assistant-Id');

  // @ts-ignore
  let assistant = await prisma.assistant.findFirst({
    where: {
      id: assistantId ? assistantId : undefined,
    },
    include: {
      organization: true,
      modelProviderKey: true
    },
  });

  if (!assistant) {
    throw new Error('Assistant does not exist');
  }

  return getOpenAI(assistant);
};
