import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const prisma = new PrismaClient();

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-2, 1)[0];
};

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });

  if (token) {
    try {
      let assistantId = getId(req);

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
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
