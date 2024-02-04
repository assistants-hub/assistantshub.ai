import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    let assistantId = req.headers.get('X-Assistant-Id');

    let assistant = await prisma.assistant.findFirst({
      where: {
        id: assistantId ? assistantId : undefined,
      },
      include: {
        credentials: true,
      },
    });

    if (!assistant) {
      return Response.json(
        { message: 'Assistant does not exist' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: assistant?.credentials?.openAIApiKey,
    });

    let createThreadResponse = await openai.beta.threads.create();
    return Response.json(createThreadResponse, { status: 201 });
  } catch (err: any) {
    console.log(err);
    return Response.json({ message: err.message }, { status: err.status });
  }
}
