import { ulid } from 'ulidx';
import OpenAI from 'openai';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import Busboy from '@fastify/busboy';
import { Readable } from 'node:stream';
import prisma from '@/app/api/utils/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import { getOpenAI } from '@/app/api/utils/openai';

// Utility function to convert ReadableStream to Node.js Stream
function toNodeReadable(readable: any) {
  return Readable.from(readable);
}

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-2, 1)[0];
};

const getAssistant = async (id: string) => {
  return await prisma.assistant.findFirst({
    where: {
      id: id,
    },
    include: {
      organization: true,
      Folder: true,
      modelProviderKey: true,
    },
  });
};

const getRequestedFolder = (req: Request) => {
  // TODO: When there are future folders, we can optionally get them from the folderId
  let requestedFolder = req.headers.get('X-Folder');

  // Get the folder from the header if specified
  if (!requestedFolder) requestedFolder = 'default';

  return requestedFolder;
};

const validateIncomingToken = async (user: any, assistant: any) => {
  return !(user === null || assistant.organization.owner !== user.sub);
};

export async function POST(req: NextRequest, res: Response) {
  const session = await getSession();
  let assistantId = getId(req);
  let assistant = await getAssistant(assistantId);
  if (!assistant) {
    return Response.json(
      { message: 'Assistant does not exist' },
      { status: 404 }
    );
  }

  if (!(await validateIncomingToken(session?.user, assistant))) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  let requestedFolder = getRequestedFolder(req);

  let folder: any = null;
  assistant.Folder.map((item: any) => {
    if (item.name === requestedFolder) {
      folder = item;
    }
  });

  // No folders exist, create a default folder
  if (!assistant.Folder || !assistant.Folder.length) {
    let folderId = ulid();
    let openai = getOpenAI(assistant);

    let createStoreResponse = {};
    if (assistant.modelProviderId === 'openai') {
      // create associated vector store
      createStoreResponse = await openai.beta.vectorStores.create({
        name: folderId,
      });

      // @ts-ignore
      let updatePayload = {
        tools: [{ type: 'file_search' }],
        tool_resources: {
          // @ts-ignore
          file_search: { vector_store_ids: [createStoreResponse.id] },
        },
      };
      // attach vector store to the assistant
      await openai.beta.assistants.update(assistant.id, updatePayload as any);
    }

    // Create the folder mapped to the vector store
    folder = await prisma.folder.create({
      data: {
        id: folderId,
        name: 'default',
        type: 'documents',
        object: createStoreResponse,
        status: 'processing',
        assistantId: assistant.id,
      },
    });
  }

  let fileId = 'file_' + ulid();

  let headers = {};
  req.headers.forEach((value: string, key: string, parent) => {
    // @ts-ignore
    headers[key] = value;
  });

  const busboy = new Busboy({ headers: headers } as any);
  let file = {};
  let uploadedFile: any;
  busboy.on(
    'file',
    (
      fieldName: string,
      file: any,
      filename: string,
      encoding: string,
      mimetype: string
    ) => {
      // Create a temporary file path
      let tmpFileName = fileId + path.extname(filename).trim();
      const filePath = path.join(os.tmpdir(), tmpFileName);
      const writeStream = fs.createWriteStream(filePath);

      // Pipe the incoming file stream into the file write stream
      file.pipe(writeStream);
      uploadedFile = {
        fieldName,
        filename: tmpFileName,
        originalFileName: filename,
        encoding,
        mimetype,
        filePath,
      };

      writeStream.on('close', async () => {
        console.log(
          `File [${filename}] uploaded to temporary storage: ${filePath}`
        );
      });
    }
  );

  const nodeReadable = toNodeReadable(req.body);
  nodeReadable.pipe(busboy);

  return new Promise<Response>((resolve) => {
    busboy.on('finish', async () => {
      if (uploadedFile) {
        try {
          // Now you can create a read stream from the saved file
          const readStream = fs.createReadStream(uploadedFile.filePath);

          // Upload the file to S3
          let configuration = { region: process.env.AWS_REGION };
          // @ts-ignore
          const client = new S3Client(configuration);
          const uploadCommand = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: uploadedFile.filename,
            Body: readStream,
          } as any);

          // @ts-ignore
          const awsResponse = await client.send(uploadCommand as any);
          let fileResponse: any = {};
          if (assistant?.modelProviderId === 'openai') {
            let openai = getOpenAI(assistant);
            fileResponse = await openai.files.create({
              file: fs.createReadStream(uploadedFile.filePath),
              purpose: 'assistants',
            });

            // @ts-ignore
            let vectorStoreFileResponse =
              await openai.beta.vectorStores.files.create(folder.object.id, {
                file_id: fileResponse.id,
              });
          }

          file = await prisma.file.create({
            data: {
              id: fileId,
              name: uploadedFile.filename,
              originalFileName: uploadedFile.originalFileName,
              object: fileResponse,
              folderId: folder.id,
              assistantId: assistant?.id,
            },
          });

          // Clean up after the upload is handled
          fs.unlink(uploadedFile.filePath, (err) => {
            if (err) console.error('Error cleaning up temporary file:', err);
          });
          return resolve(Response.json(file, { status: 201 }));
        } catch (err: any) {
          console.log(err);
          return resolve(
            Response.json({ message: err.message }, { status: 500 })
          );
        }
      } else {
        return resolve(
          Response.json({ message: 'No file uploaded' }, { status: 400 })
        );
      }
    });
  });
}

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getSession();
  let assistantId = getId(req);
  let assistant = await getAssistant(assistantId);
  if (!assistant) {
    return Response.json(
      { message: 'Assistant does not exist' },
      { status: 404 }
    );
  }

  if (!(await validateIncomingToken(session?.user, assistant))) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  let requestedFolder = getRequestedFolder(req);

  let folder: any = null;
  assistant.Folder.map((item: any) => {
    if (item.name === requestedFolder) {
      folder = item;
    }
  });

  if (!folder) {
    return Response.json({ message: 'Folder does not exist' }, { status: 404 });
  }

  let files = await prisma.file.findMany({
    where: {
      folderId: folder.id,
    },
  });

  let updates = false;
  if (assistant?.modelProviderId === 'openai') {
    files.map(async (file) => {
      // @ts-ignore
      if (!['completed', 'cancelled', 'failed'].includes(file.object.status)) {
        updates = true;
        let openai = getOpenAI(assistant);

        let vectorStoreFileResponse =
          // @ts-ignore
          await openai.beta.vectorStores.files.retrieve(
            // @ts-ignore
            folder.object.id,
            // @ts-ignore
            file.object.id
          );

        // @ts-ignore
        file.object.status = vectorStoreFileResponse.status;
        // @ts-ignore
        file.object.last_error = vectorStoreFileResponse.last_error;

        await prisma.file.update({
          where: {
            id: file.id,
          },
          data: {
            // @ts-ignore
            object: file.object,
          },
        });
      }
    });
  }

  if (updates) {
    files = await prisma.file.findMany({
      where: {
        folderId: folder.id,
      },
    });
  }

  return Response.json(files, { status: 200 });
}
