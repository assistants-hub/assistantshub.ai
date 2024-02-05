import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIObjectForAssistant } from '@/app/api/utils';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const openai = (await getOpenAIObjectForAssistant(req, prisma)) as OpenAI;

    let createThreadResponse = await openai.beta.threads.create();
    return Response.json(createThreadResponse, { status: 201 });
  } catch (err: any) {
    console.log(err);
    return Response.json({ message: err.message }, { status: err.status });
  }
}
