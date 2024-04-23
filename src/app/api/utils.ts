import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';

const { GoogleGenerativeAI } = require('@google/generative-ai');

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

export const getGoogleGenAIObjectForAssistant = async (
  req: NextRequest,
  prisma: PrismaClient
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
      object: true
    },
  });

  if (!assistant) {
    throw new Error('Assistant does not exist');
  }

  let genAI = new GoogleGenerativeAI(
    assistant?.organization?.googleAIStudioKey
  );
  return genAI.getGenerativeModel({
    model: 'gemini-1.5-pro-latest',
    systemInstruction: {
      role: 'model',
      // @ts-ignore
      parts: [{ text: assistant?.object?.instructions }]
    }});
};
