import OpenAI from 'openai';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export async function GET(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });
  if (token) {
    const models = await openai.models.list();
    return Response.json(models);
  } else {
    // Not Signed in
    return Response.json({ message: 'Unauthenticated' }, { status: 401 });
  }
}
