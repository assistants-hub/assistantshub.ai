import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { ulid } from 'ulidx';

const prisma = new PrismaClient();

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-2, 1)[0];
};

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    let threadId = getId(req);
    let after = req.nextUrl.searchParams.get('after');
    if (after) {
      after = after.trim();
    }
    let assistantId = req.headers.get('X-Assistant-Id');

    try {
      if (after) {
        let messages = await prisma.message.findMany({
          take: 1,
          skip: 1,
          cursor: {
            id: after,
          },
          where: {
            threadId: threadId,
          },
          select: {
            object: true,
          },
          orderBy: {
            id: 'asc',
          },
        });

        return Response.json(
          { data: messages.map((item) => item.object) },
          { status: 200 }
        );
      } else {
        let messages = await prisma.message.findMany({
          where: {
            threadId: threadId,
          },
          select: {
            object: true,
          },
          orderBy: {
            created_at: 'asc',
          },
        });

        return Response.json(
          { data: messages.map((item) => item.object) },
          { status: 200 }
        );
      }
    } catch (err: any) {
      console.log(err);
      return Response.json({ message: err.message }, { status: err.status });
    }
  } catch (err: any) {
    console.log(err);
    return Response.json({ message: err.message }, { status: err.status });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    let threadId = getId(req);
    let assistantId = req.headers.get('X-Assistant-Id');

    try {
      let createMessageResponse = {
        id: 'msg_' + ulid(),
        role: body.message.role,
        content: body.message.content,
        created_at: Math.floor(new Date().getTime() / 1000),
      };

      await prisma.message.upsert({
        where: {
          id: createMessageResponse.id,
        },
        update: {
          id: createMessageResponse.id,
          threadId: threadId,
          object: createMessageResponse as any,
        },
        create: {
          id: createMessageResponse.id,
          threadId: threadId,
          object: createMessageResponse as any,
        },
      });

      // add the metric event for Message creation
      await prisma.metric.create({
        data: {
          assistantId: assistantId ? assistantId : 'unknown',
          name: 'MESSAGE_CREATED',
          value: 1,
          tags: createMessageResponse as any,
        },
      });

      return Response.json(createMessageResponse, { status: 201 });
    } catch (err: any) {
      console.log(err);
      return Response.json({ message: err.message }, { status: err.status });
    }
  } catch (err: any) {
    console.log(err);
    return Response.json({ message: err.message }, { status: err.status });
  }
}
