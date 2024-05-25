import { NextRequest, NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';
import { ulid } from 'ulidx';
import prisma from '@/app/api/utils/prisma';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { city, country, region } = geolocation(req);

    let assistantId = req.headers.get('X-Assistant-Id');

    let metadata: any = {};
    let fingerprint = req.headers.get('X-Fingerprint');
    if (fingerprint) {
      metadata['fingerprint'] = fingerprint;
    }

    if (city) {
      metadata['city'] = city;
    }
    if (country) {
      metadata['country'] = country;
    }
    if (region) {
      metadata['region'] = region;
    }

    try {
      let id = 'thread_' + ulid();
      let createThreadResponse = {
        id: id,
        metadata: metadata,
      };

      await prisma.thread.upsert({
        where: {
          id: createThreadResponse.id,
        },
        update: {
          id: createThreadResponse.id,
          assistantId: assistantId,
          object: createThreadResponse as any,
        },
        create: {
          id: createThreadResponse.id,
          assistantId: assistantId,
          object: createThreadResponse as any,
        },
      });

      // add the metric event
      await prisma.metric.create({
        data: {
          assistantId: assistantId ? assistantId : 'unknown',
          name: 'THREAD_CREATED',
          value: 1,
          tags: createThreadResponse as any,
        },
      });

      return Response.json(createThreadResponse, { status: 201 });
    } catch (err: any) {
      console.log(err);
      return Response.json({ message: err.message }, { status: err.status });
    }
  } catch (err: any) {
    console.log(err);
    return Response.json({ message: err.message }, { status: err.status });
  }
}
