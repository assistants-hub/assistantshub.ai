import OpenAI from 'openai';
import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });
  if (token) {
    // Signed in
    let credentials = await prisma.credentials.findFirst({
      where: {
        owner: token.sub,
      },
    });

    if (!credentials) {
      return Response.json([]);
    } else {
      return Response.json([credentials]);
    }
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });
  if (token && token.sub) {
    const body = await req.json();

    if (body.openAiApiKey) {
      // Validate the Open API Key
      let models = null;
      try {
        const openai = new OpenAI({ apiKey: body.openAiApiKey });
        models = await openai.models.list();
      } catch (error) {
        return Response.json(
          { message: 'Incorrect API key provided' },
          { status: 401 }
        );
      }

      // Signed in
      let credential = await prisma.credentials.upsert({
        where: {
          owner_ownerType: {
            owner: token.sub,
            ownerType: 'personal',
          },
        },
        update: {
          openAIApiKey: body.openAiApiKey,
        },
        create: {
          owner: token.sub,
          openAIApiKey: body.openAiApiKey,
        },
      });
      return Response.json(
        { message: 'OpenAI API Key updated successfully.' },
        { status: 201 }
      );
    } else {
      return Response.json(
        { message: 'No valid Open AI Key provided (openAiApiKey)' },
        { status: 400 }
      );
    }
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
