import OpenAI from 'openai';
import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

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

        await prisma.assistant.upsert({
          where: {
            id: createResponse.id,
          },
          update: {
            id: createResponse.id,
            credentialsOwner: token.sub,
            credentialsOwnerType: 'personal',
          },
          create: {
            id: createResponse.id,
            credentialsOwner: token.sub,
            credentialsOwnerType: 'personal',
          },
        });

        return Response.json(createResponse, { status: 201 });
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

      try {
        const listResponse = await openai.beta.assistants.list();
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
