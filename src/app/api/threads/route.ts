import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIObjectForAssistant } from '@/app/api/utils';
import { geolocation } from '@vercel/edge';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    let assistantId = req.headers.get('X-Assistant-Id');

    let threads = await prisma.thread.findMany({
      where: {
        assistantId: assistantId,
      },
      select: {
        id: true,
        object: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    let threadsCollection = threads.map((thread) => {
      return thread.object;
    });
    return Response.json(threadsCollection, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return Response.json({ message: err.message }, { status: err.status });
  }
}