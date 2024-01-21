import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-1, 1)[0];
};

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });

  const id = getId(req);

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

      try {
        const listResponse = await openai.beta.assistants.retrieve(id);
        return Response.json(listResponse, { status: 200 });
      } catch (err: any) {
        return Response.json({ message: err.message }, { status: err.status });
      }
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
