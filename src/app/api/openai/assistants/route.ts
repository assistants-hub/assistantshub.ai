import OpenAI from 'openai';
import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });

  if (token) {
    let organization = await prisma.organization.findFirst({
      where: {
        owner: token.sub,
        ownerType: 'personal',
      },
    });

    if (organization) {
      const openai = new OpenAI({
        apiKey: organization.openAIApiKey,
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
            accountOwner: token.sub,
            accountOwnerType: 'personal',
            object: createResponse as any,
          },
          create: {
            id: createResponse.id,
            accountOwner: token.sub,
            accountOwnerType: 'personal',
            object: createResponse as any,
          },
        });

        return Response.json(createResponse, { status: 201 });
      } catch (err: any) {
        console.log(err);
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
    let assistants = await prisma.assistant.findMany({
      where: {
        accountOwner: token.sub,
        accountOwnerType: 'personal',
      },
      select: {
        id: true,
        object: true,
        profile: true,
      },
    });
    let assistantsCollection = assistants.map((assistant) => {
      if (assistant.object) {
        // @ts-ignore
        assistant.object.profile = assistant.profile;
      }
      return assistant.object;
    });
    return Response.json(assistantsCollection, { status: 200 });
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
