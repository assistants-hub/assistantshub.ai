import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import path from 'path';
import OpenAI from 'openai';
import prisma from '@/app/api/utils/prisma';

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

const createPresignedGet = async (
  file: string,
  expires: number = 3600
): Promise<string> => {
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
};

async function deleteFileFromS3(file: string): Promise<any> {
  let configuration = { region: process.env.AWS_REGION };
  // @ts-ignore
  const s3Client = new S3Client(configuration);

  const deleteCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: file,
  });

  try {
    return await s3Client.send(deleteCommand as any);
  } catch (error) {
    console.error('Failed to delete file from S3:', error);
    throw error; // Rethrowing the error is useful if you need to handle it further up the chain.
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

  let fileId = getFileId(req);

  if (!(await validateIncomingToken(req, assistant))) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    let file = await prisma.file.findFirst({
      where: {
        id: fileId,
      },
      select: {
        id: true,
        originalFileName: true,
        object: true,
        folder: true,
      },
    });

    if (!file) {
      return Response.json({ message: 'File not found' }, { status: 404 });
    }

    if (assistant?.modelProviderId === 'openai') {
      let openai = new OpenAI({
        apiKey: assistant?.organization?.openAIApiKey,
      });
      try {
        // 1. Remove file from Vector Store
        // @ts-ignore
        let vectorStoreFileResponse = await openai.beta.vectorStores.files.del(
          // @ts-ignore
          file.folder.object.id,
          // @ts-ignore
          file.object.id
        );
      } catch (err) {
        console.error('Error removing file from Vector Store:', err);
      }

      try {
        // 2. Delete file from Open AI
        // @ts-ignore
        let filesResponse = await openai.files.del(file.object.id);
      } catch (err) {
        console.error('Error removing file from OpenAI:', err);
      }
    }
    // 3. Delete file from S3
    let fileName = file.id + path.extname(file.originalFileName);
    let s3Response = await deleteFileFromS3(fileName.trim());

    // 4. Remove file from DB
    await prisma.file.delete({
      where: {
        id: fileId,
      },
    });

    return Response.json(file, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: 'File not found' }, { status: 404 });
  }
}
