import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/utils/prisma';
import OpenAI from 'openai';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { getOpenAI } from '@/app/api/utils/openai';

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-1, 1)[0];
};

// TODO: Limit these to same domain requests
export async function GET(req: NextRequest, res: NextResponse) {
  const id = getId(req);

  let assistant = await prisma.assistant.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      object: true,
      modelId: true,
      modelProviderId: true,
      avatar: true,
      profile: true,
      theme: true,
    },
  });

  if (!assistant) {
    return Response.json(
      { message: 'Assistant does not exist' },
      { status: 404 }
    );
  }

  // Inject customization properties into the assistant object
  if (assistant.object) {
    // @ts-ignore
    assistant.object.avatar = assistant.avatar;
    // @ts-ignore
    assistant.object.profile = assistant.profile;
    // @ts-ignore
    assistant.object.theme = assistant.theme;
    // @ts-ignore
    assistant.object.modelId = assistant.modelId
      ? assistant.modelId
      : // @ts-ignore
        assistant.object.model;
    // @ts-ignore
    assistant.object.modelProviderId = assistant.modelProviderId;
  }

  return Response.json(assistant.object, { status: 200 });
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  const session = await getSession();

  const id = getId(req);

  if (session?.user) {
    let organization = await prisma.organization.findFirst({
      where: {
        owner: session?.user.sub,
        ownerType: 'personal',
      },
    });

    if (organization) {
      try {
        const body = await req.json();
        delete body.id;

        // TODO: Check if assistant exists and if the user is the owner
        let assistant = await prisma.assistant.findFirst({
          where: {
            id: id,
          },
          select: {
            id: true,
            object: true,
            organizationOwner: true,
            organizationOwnerType: true,
            modelId: true,
            modelProviderId: true,
          },
        });

        if (
          !assistant ||
          assistant.organizationOwner !== session?.user.sub ||
          assistant.organizationOwnerType !== 'personal'
        ) {
          return Response.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // remove the items that don't belong to the body
        let avatar = body.avatar;
        delete body.avatar;

        let profile = body.profile;
        delete body.profile;

        let theme = body.theme;
        delete body.theme;

        let modelId = body.modelId;
        delete body.modelId;

        let modelProviderId = body.modelProviderId;
        delete body.modelProviderId;

        // We don't support the special case where the model provider can be changed. This is disabled in UI
        let updateResponse = null;
        if (assistant.modelProviderId === 'openai') {
          body.model = modelId;
          const openai = getOpenAI(assistant);

          updateResponse = await openai.beta.assistants.update(id, body);
        } else {
          updateResponse = body;
          updateResponse.id = assistant.id;
        }

        await prisma.assistant.upsert({
          where: {
            id: updateResponse.id,
          },
          update: {
            id: updateResponse.id,
            organizationOwner: session?.user.sub,
            organizationOwnerType: 'personal',
            object: updateResponse as any,
            avatar: avatar,
            profile: profile,
            theme: theme,
            modelId: modelId,
            modelProviderId: modelProviderId,
          },
          create: {
            id: updateResponse.id,
            organizationOwner: session?.user.sub,
            organizationOwnerType: 'personal',
            object: updateResponse as any,
            avatar: avatar,
            profile: profile,
            theme: theme,
            modelId: modelId,
            modelProviderId: modelProviderId,
          },
        });

        return Response.json(updateResponse, { status: 200 });
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

export async function DELETE(req: NextRequest, res: NextResponse) {
  const session = await getSession();

  const id = getId(req);

  if (session?.user) {
    let organization = await prisma.organization.findFirst({
      where: {
        owner: session?.user.sub,
        ownerType: 'personal',
      },
    });

    if (organization) {
      try {
        let assistant = await prisma.assistant.findFirst({
          where: {
            id: id,
          },
          select: {
            id: true,
            object: true,
            organizationOwner: true,
            organizationOwnerType: true,
            modelProviderId: true,
          },
        });

        if (
          !assistant ||
          assistant.organizationOwner !== session?.user.sub ||
          assistant.organizationOwnerType !== 'personal'
        ) {
          return Response.json({ message: 'Unauthorized' }, { status: 401 });
        }

        let deleteResponse: any = { id: assistant.id };
        if (assistant.modelProviderId === 'openai') {
          const openai = getOpenAI(assistant);

          deleteResponse = await openai.beta.assistants.del(id);
        }

        await prisma.assistant.delete({
          where: {
            id: id,
          },
        });

        return Response.json(deleteResponse, { status: 200 });
      } catch (err: any) {
        return Response.json({ message: err.message }, { status: err.status });
      }
    } else {
      return Response.json(
        { message: 'API Key does not exist' },
        { status: 400 }
      );
    }
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
