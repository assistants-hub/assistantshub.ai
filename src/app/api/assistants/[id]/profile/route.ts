import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/utils/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-2, 1)[0];
};

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
  const body = (await req.json()) as HandleUploadBody;

  let id = getId(req);
  let request = req;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        pathname
        /* clientPayload */
      ) => {
        // Generate a client token for the browser to upload the file
        // ⚠️ Authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.
        const session = await getSession();

        if (session) {
          let organization = await prisma.organization.findFirst({
            where: {
              owner: session?.user.sub,
              ownerType: 'personal',
            },
          });

          if (organization) {
            try {
              // Check if assistant exists and if the user is the owner
              let assistant = await prisma.assistant.findFirst({
                where: {
                  id: id,
                },
                select: {
                  id: true,
                  object: true,
                  organizationOwner: true,
                  organizationOwnerType: true,
                },
              });

              if (
                !assistant ||
                assistant.organizationOwner !== session?.user.sub ||
                assistant.organizationOwnerType !== 'personal'
              ) {
                throw new Error('Unauthenticated');
              }

              return {
                allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
                tokenPayload: JSON.stringify({
                  // optional, sent to your server on upload completion
                  // you could pass a user id from auth, or a value from clientPayload
                }),
              };
            } catch (err: any) {
              throw err;
            }
          } else {
            throw new Error('OpenAI API Key does not exist');
          }
        } else {
          // Not Signed in
          throw new Error('Unauthenticated');
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified of client upload completion
        // ⚠️ This will not work on `localhost` websites,
        // Use ngrok or similar to get the full upload flow

        console.log('blob upload completed', blob, tokenPayload);
        try {
          // Run any logic after the file upload completed
          await prisma.assistant.update({
            where: {
              id: id,
            },
            data: {
              profile: blob.url,
            },
          });
        } catch (error) {
          throw new Error('Could not update user');
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, {
      status: 400,
    } as any);
  }
}
