import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ulid } from 'ulidx';
import prisma from '@/app/api/utils/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getSession();

  if (session?.user) {
    let assistants = await prisma.assistant.findMany({
      where: {
        organizationOwner: session?.user.sub,
        organizationOwnerType: 'personal',
      },
      select: {
        id: true,
        object: true,
        profile: true,
        modelId: true,
      },
    });
    let assistantsCollection = assistants.map((assistant) => {
      if (assistant.object) {
        // @ts-ignore
        assistant.object.profile = assistant.profile;
        // @ts-ignore
        assistant.object.modelId = assistant.modelId;
      }
      return assistant.object;
    });
    return Response.json(assistantsCollection, { status: 200 });
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getSession();

  if (session?.user) {
    let organization = await prisma.organization.findFirst({
      where: {
        owner: session?.user.sub,
        ownerType: 'personal',
      },
    });

    if (organization) {
      const body = await req.json();

      let modelId = body.modelId;
      delete body.modelId;

      let modelProviderId = body.modelProviderId;
      delete body.modelProviderId;

      try {
        let createResponse = null;
        if (modelProviderId === 'openai') {
          const openai = new OpenAI({
            apiKey: organization.openAIApiKey,
          });

          body.model = modelId;

          createResponse = await openai.beta.assistants.create(body);
        } else {
          // Google or Groq doesn't provide an API for its assistants so we just store everything else into the database
          createResponse = body;
          createResponse.id = 'asst_g' + ulid();
        }

        await prisma.assistant.upsert({
          where: {
            id: createResponse.id,
          },
          update: {
            id: createResponse.id,
            organizationOwner: session?.user.sub,
            organizationOwnerType: 'personal',
            object: createResponse as any,
            modelId: modelId,
            modelProviderId: modelProviderId,
          },
          create: {
            id: createResponse.id,
            modelId: modelId,
            modelProviderId: modelProviderId,
            organizationOwner: session?.user.sub,
            organizationOwnerType: 'personal',
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
