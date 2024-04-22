import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import { ulid } from 'ulidx';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });

  if (token) {
    let assistants = await prisma.assistant.findMany({
      where: {
        organizationOwner: token.sub,
        organizationOwnerType: 'personal',
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
          // Google doesn't provide an API for its assistants so we just store everything else into the database
          createResponse = body;
          createResponse.id = 'asst_g' + ulid();
        }

        await prisma.assistant.upsert({
          where: {
            id: createResponse.id,
          },
          update: {
            id: createResponse.id,
            organizationOwner: token.sub,
            organizationOwnerType: 'personal',
            object: createResponse as any,
            modelId: modelId,
            modelProviderId: modelProviderId,
          },
          create: {
            id: createResponse.id,
            modelId: modelId,
            modelProviderId: modelProviderId,
            organizationOwner: token.sub,
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
