import { NextRequest, NextResponse } from 'next/server';
import { csrfToken, verifyCsrfToken } from '@/app/api/utils/csrf';
import prisma from '@/app/api/utils/prisma';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    let body = await req.json();
    let valid = await verifyCsrfToken(body?.token);
    if (!valid) {
      return Response.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    let data = {
      currentStep: body.step,
    };

    console.log(body);

    let metadata = body.metadata;

    if (metadata.adminUserCreated) {
      // @ts-ignore
      data['adminUserCreated'] = metadata.adminUserCreated;
    }

    if (metadata.agreeToTerms) {
      // @ts-ignore
      data['agreeToTerms'] = metadata.agreeToTerms;
    }

    console.log(data);

    let update = await prisma.system.update({
      where: {
        id: 'system',
      },
      data: data,
    });

    console.log(update);

    return Response.json({ message: 'Updates successful' });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Failed to update datastore' }, { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const token = await csrfToken(req, res);
    return Response.json({ token: token }, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Failed to get CSRF token' }, { status: 500 });
  }
}
