import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/utils/prisma';
import { getSession } from '@auth0/nextjs-auth0';

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getSession();
  if (session?.user) {
    // Signed in
    let organization = await prisma.organization.findFirst({
      where: {
        owner: session?.user.sub,
      },
    });

    if (!organization) {
      return Response.json([]);
    } else {
      return Response.json([
        { hasCredentials: organization.openAIApiKey !== null },
      ]);
    }
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
};

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getSession();
  if (session && session?.user.sub) {
    const body = await req.json();

    if (body.openAiApiKey) {
      if (body.openAiApiKey.toLowerCase() === 'use-default') {
        body.openAiApiKey = process.env.OPENAI_API_KEY;
        body.googleAIStudioKey = process.env.GOOGLE_AI_STUDIO_API_KEY;
        body.groqCloudApiKey = process.env.GROQ_CLOUD_API_KEY;
        body.anthropicApiKey = process.env.ANTHROPIC_API_KEY;
      }

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
      await prisma.organization.upsert({
        where: {
          owner_ownerType: {
            owner: session?.user.sub,
            ownerType: 'personal',
          },
        },
        update: {
          openAIApiKey: body.openAiApiKey,
          googleAIStudioKey: body.googleAIStudioKey,
          groqCloudApiKey: body.groqCloudApiKey,
          anthropicApiKey: body.anthropicApiKey
        },
        create: {
          owner: session?.user.sub,
          openAIApiKey: body.openAiApiKey,
          googleAIStudioKey: body.googleAIStudioKey,
          groqCloudApiKey: body.groqCloudApiKey,
          anthropicApiKey: body.anthropicApiKey
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
};
