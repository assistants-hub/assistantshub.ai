import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { Stream } from 'openai/streaming';
import { ulid } from 'ulidx';
import { createMessage } from '@/app/api/utils/messages';
import { getOpenAIObjectForAssistant } from '@/app/api/openai/util';

const prisma = new PrismaClient();

const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split('/').splice(-2, 1)[0];
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    let threadId = getId(req);
    let assistantId = req.headers.get('X-Assistant-Id');
    const openai = (await getOpenAIObjectForAssistant(req, prisma)) as OpenAI;

    const runResponse: Stream<any> = await openai.beta.threads.runs.create(
      threadId,
      { assistant_id: assistantId ? assistantId : '', stream: true }
    );

    let msgId = 'msg_' + ulid();
    let buffer = '';
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let completed = false;
          for await (const event of runResponse) {
            if (event.event === 'thread.message.delta') {
              let data = event.data.delta.content[0].text.value;
              buffer += data;
              controller.enqueue(data);
            }

            if (event.event === 'thread.run.completed') {
              completed = true;
            }
          }
          if (completed) {
            await createMessage(
              assistantId ? assistantId : '',
              threadId,
              msgId,
              buffer
            );
          }
        } catch (error) {
          controller.error(error);
        }
        controller.close();
      },
    });

    return new Response(stream);
  } catch (err: any) {
    console.log(err);
    return Response.json({ message: err.message }, { status: err.status });
  }
}
