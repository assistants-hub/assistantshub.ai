import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIObjectForAssistant } from '@/app/api/utils';

const prisma = new PrismaClient();

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-2, 1)[0];
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    let threadId = getId(req);
    let assistantId = req.headers.get('X-Assistant-Id');
    const openai = (await getOpenAIObjectForAssistant(req, prisma)) as OpenAI;

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
