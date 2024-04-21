import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Note: We should not cache the models list as it may change frequently for different organizations
export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });
  if (token) {
    let models = await prisma.model.findMany({
      include: {
        provider: true
      }
    });
    return Response.json(models);
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
