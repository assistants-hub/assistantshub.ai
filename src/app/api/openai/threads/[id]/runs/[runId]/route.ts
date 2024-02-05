import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIObjectForAssistant } from '@/app/api/utils';

const prisma = new PrismaClient();

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-1, 1)[0];
};

const getThreadId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-3, 1)[0];
};

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    let threadId = getThreadId(req);
    let runId = getId(req);
    const openai = (await getOpenAIObjectForAssistant(req, prisma)) as OpenAI;

    let runResponse = await openai.beta.threads.runs.retrieve(
      threadId ? threadId : '',
      runId
    );

    return Response.json(runResponse, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return Response.json({ message: err.message }, { status: err.status });
  }
}
