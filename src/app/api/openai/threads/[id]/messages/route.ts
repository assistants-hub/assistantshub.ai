import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { after } from 'node:test';

const prisma = new PrismaClient();

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-2, 1)[0];
};

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    let assistantId = req.headers.get('X-Assistant-Id');
    let threadId = getId(req);
    let after = req.nextUrl.searchParams.get('after');

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

    // @ts-ignore
    let messagesResponse = await openai.beta.threads.messages.list(threadId, {
      order: 'asc',
      // @ts-ignore
      after: after,
    });
    return Response.json(messagesResponse, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return Response.json({ message: err.message }, { status: err.status });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
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

    let message = {
      role: body.message.role,
      content: body.message.content[0].text.value,
    };

    let createMessageResponse = await openai.beta.threads.messages.create(
      threadId,
      message
    );
    return Response.json(createMessageResponse, { status: 201 });
  } catch (err: any) {
    console.log(err);
    return Response.json({ message: err.message }, { status: err.status });
  }
}
