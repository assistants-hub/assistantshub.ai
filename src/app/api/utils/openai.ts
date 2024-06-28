import OpenAI from 'openai';
import prisma from '@/app/api/utils/prisma';

export function getOpenAI(assistant: any): OpenAI {
  let openAIAPIKey = process.env.OPENAI_API_KEY
    ? process.env.OPENAI_API_KEY
    : null;

  if (assistant.modelProviderKey) {
    openAIAPIKey = assistant.modelProviderKey.key['apiKey'];
  }

  if (!openAIAPIKey) {
    throw new Error('OpenAI API key is missing');
  }

  return new OpenAI({
    apiKey: openAIAPIKey,
  });
}

export async function getOpenAIWithKey(modelProviderKeyId: string) {
  let openAIAPIKey = process.env.OPENAI_API_KEY
    ? process.env.OPENAI_API_KEY
    : null;

  if (modelProviderKeyId) {
    let modelProviderKey = await prisma.modelProviderKey.findFirst({
      where: {
        id: modelProviderKeyId,
      },
      select: {
        id: true,
        name: true,
        key: true,
      },
    });

    if (modelProviderKey && modelProviderKey.key) {
      // @ts-ignore
      openAIAPIKey = modelProviderKey.key['apiKey'];
    }
  }

  if (!openAIAPIKey) {
    throw new Error('OpenAI API key missing');
  }

  return new OpenAI({
    apiKey: openAIAPIKey,
  });
}
