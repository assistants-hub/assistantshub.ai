import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const createMessage = async (
  assistantId: string,
  threadId: string,
  msgId: string,
  buffer: string
) => {
  let object = {
    id: msgId,
    role: 'assistant',
    content: [
      {
        type: 'text',
        text: {
          value: buffer,
          annotations: [],
        },
      },
    ],
    created_at: Math.floor(new Date().getTime() / 1000),
  };
  // Save the message to the database
  let message = await prisma.message.upsert({
    where: {
      id: msgId,
    },
    update: {
      id: msgId,
      threadId: threadId,
      object: object,
    },
    create: {
      id: msgId,
      threadId: threadId,
      object: object,
    },
  });

  // add the metric event for Message creation
  await prisma.metric.create({
    data: {
      assistantId: assistantId ? assistantId : 'unknown',
      name: 'MESSAGE_CREATED',
      value: 1,
      time: new Date(message.created_at),
      tags: message as any,
    },
  });
};
