import { NextRequest, NextResponse } from 'next/server';
import { ulid } from 'ulidx';
import prisma from '@/app/api/utils/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import { getOpenAIForOrganization } from '@/app/api/utils/openai';

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
        avatar: true,
        profile: true,
        modelId: true,
        published: true,
        authenticatedUsersOnly: true,
      },
    });
    let assistantsCollection = assistants.map((assistant) => {
      if (assistant.object) {
        // @ts-ignore
        assistant.object.profile = assistant.profile;
        // @ts-ignore
        assistant.object.modelId = assistant.modelId;
        // @ts-ignore
        assistant.object.published = assistant.published;
        // @ts-ignore
        assistant.object.avatar = assistant.avatar;
        // @ts-ignore
        assistant.object.authenticatedUsersOnly =
          assistant.authenticatedUsersOnly;
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

      let modelProviderKeyId = body.modelProviderKeyId;
      delete body.modelProviderKeyId;

      try {
        let createResponse = null;
        if (modelProviderId === 'openai') {
          const openai = getOpenAIForOrganization(organization);

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
            modelProviderKeyId: modelProviderKeyId,
          },
          create: {
            id: createResponse.id,
            modelId: modelId,
            modelProviderId: modelProviderId,
            modelProviderKeyId: modelProviderKeyId,
            organizationOwner: session?.user.sub,
            organizationOwnerType: 'personal',
            object: createResponse as any,
            published: true,
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
