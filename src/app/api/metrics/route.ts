import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });

  let assistantId = req.headers.get('X-Assistant-Id');
  let metricName = req.nextUrl.searchParams.get('metric');
  let bucketBy = req.nextUrl.searchParams.get('bucket');

  if (token) {
    //TODO: check if the assistant belongs to the token
    let results =
      await prisma.$queryRaw`SELECT  time_bucket('1 hour', time) AS x,
                sum(value) AS y
       FROM public."Metric"
       WHERE name = ${metricName}
        AND "assistantId" = ${assistantId} 
        AND time BETWEEN ('2024-03-26T00:00:00.000Z')::timestamp 
	          AND ('2024-03-26T22:54:28.039Z')::timestamp
       GROUP BY x, "assistantId"`;

    console.log(results);

    return Response.json(results, { status: 200 });
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
