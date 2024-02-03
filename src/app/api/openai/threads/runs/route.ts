import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    let assistantId = body.assistant_id;

    let assistant = await prisma.assistant.findFirst({
      where: {
        id: assistantId,
      },
    });

    if (!assistant) {
      return Response.json(
        { message: 'Assistant does not exist' },
        { status: 400 }
      );
    }

    if (assistant.credentialsOwner && assistant.credentialsOwnerType) {
      let credential = await prisma.credentials.findFirst({
        where: {
          owner: assistant.credentialsOwner,
          ownerType: assistant.credentialsOwnerType,
        },
      });

      if (credential) {
        const openai = new OpenAI({
          apiKey: credential.openAIApiKey,
        });

        let runResponse = await openai.beta.threads.createAndRun(body);
        return Response.json(runResponse, { status: 201 });
      } else {
        return Response.json(
          { message: 'OpenAI API Key does not exist' },
          { status: 400 }
        );
      }
    }
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: err.status });
  }
}
