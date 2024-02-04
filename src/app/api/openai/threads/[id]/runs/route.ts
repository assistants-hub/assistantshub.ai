import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-2, 1)[0];
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    let assistantId = req.headers.get('X-Assistant-Id');
    let threadId = getId(req);

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

    let request = {
      assistant_id: assistantId,
    };

    // @ts-ignore
    let runResponse = await openai.beta.threads.runs.create(threadId, request);
    return Response.json(runResponse, { status: 201 });
  } catch (err: any) {
    console.log(err);
    return Response.json({ message: err.message }, { status: err.status });
  }
}
