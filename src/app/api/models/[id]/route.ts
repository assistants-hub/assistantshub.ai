import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-1, 1)[0];
};

// Note: We should not cache the models list as it may change frequently for different organizations
export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });
  if (token) {
    let id = getId(req);
    let model = await prisma.model.findFirst({
      where: {
        id: id,
      },
      include: {
        provider: true,
      },
    });
    return Response.json(model, { status: 200 });
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}