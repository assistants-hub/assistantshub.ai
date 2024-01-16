import OpenAI from 'openai';
import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { OpenAIError } from 'openai/error';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
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

      const body = await req.json();

      let createResponse = null;
      try {
        createResponse = await openai.beta.assistants.create(body);

        return Response.json(createResponse, { status: 201 });
      } catch (err:any) {
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
