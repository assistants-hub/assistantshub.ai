import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    let assistantId = body.assistant_id;

    let assistant = await prisma.assistant.findFirst({
      where: {
        id: assistantId,
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

    let messages = body.thread.messages.filter(
      (message: any) => message.role === 'user'
    );

    messages = messages.map((message: any) => {
      return {
        role: message.role,
        content: message.content[0].text.value,
      };
    });

    let request = {
      assistant_id: body.assistant_id,
      thread: {
        messages: messages,
      },
    };

    let runResponse = await openai.beta.threads.createAndRun(request);
    return Response.json(runResponse, { status: 201 });
  } catch (err: any) {
    console.log(err);
    return Response.json({ message: err.message }, { status: err.status });
  }
}
