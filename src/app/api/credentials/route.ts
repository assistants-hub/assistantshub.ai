import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req:NextRequest, res:NextResponse) {
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

export async function POST(req:NextRequest, res:NextResponse) {
  const token = await getToken({ req });
  if (token && token.sub) {
    const body = await req.json();

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
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
