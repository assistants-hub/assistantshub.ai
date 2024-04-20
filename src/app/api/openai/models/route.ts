import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Note: We should not cache the models list as it may change frequently for different organizations
export async function GET(req: NextRequest, res: NextResponse) {
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
      const models = await openai.models.list();
      return Response.json(models);
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
