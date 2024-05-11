import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import path from 'path';

const prisma = new PrismaClient();

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-3, 1)[0];
};

const getFileId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-1, 1)[0];
};

const getAssistant = async (id: string) => {
  return await prisma.assistant.findFirst({
    where: {
      id: id,
    },
    include: {
      organization: true,
      Folder: true,
    },
  });
};

const validateIncomingToken = async (req: NextRequest, assistant: any) => {
  const token = await getToken({ req });
  return !(token === null || assistant.organization.owner !== token.sub);
};

const createPresignedGet = async (file: string, expires: number = 3600): Promise<string> => {
  // Generate pre-signed ulr for the file in S3
  let configuration = { region: process.env.AWS_REGION };
  // @ts-ignore
  const s3Client = new S3Client(configuration);

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: file,
  });

  try {
    return await getSignedUrl(s3Client, command, { expiresIn: expires });
  } catch (err) {
    console.error('Error creating presigned URL:', err);
    throw new Error('Failed to create presigned URL');
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  let assistantId = getId(req);

  let assistant = await getAssistant(assistantId);
  if (!assistant) {
    return Response.json(
      { message: 'Assistant does not exist' },
      { status: 404 }
    );
  }

  let fileId = getFileId(req);

  if (!(await validateIncomingToken(req, assistant))) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    let file = await prisma.file.findFirst({
      where: {
        id: fileId,
      },
    });

    if (!file) {
      return Response.json({ message: 'File not found' }, { status: 404 });
    }
    let fileName = file.id + path.extname(file.originalFileName);
    // @ts-ignore
    file.downloadUrl = await createPresignedGet(fileName.trim());

    return Response.json(file, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'File not found' }, { status: 404 });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  let assistantId = getId(req);
  let assistant = await getAssistant(assistantId);
  if (!assistant) {
    return Response.json(
      { message: 'Assistant does not exist' },
      { status: 404 }
    );
  }

  if (!(await validateIncomingToken(req, assistant))) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
}