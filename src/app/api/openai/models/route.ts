import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });
  if (token) {
    let credential = await prisma.credentials.findFirst({
      where: {
        owner: token.sub,
        ownerType: 'personal',
      },
    });

    if (credential) {
      const openai = new OpenAI({
        apiKey: credential.openAIApiKey,
      });
      const models = await openai.models.list();
      return Response.json(models);
    } else {
      return Response.json(
        { message: 'OpenAI API Key does not exist' },
        { status: 400 }
      );
    }
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
