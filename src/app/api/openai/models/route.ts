import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export async function GET() {
  const models = await openai.models.list();

  return Response.json(models);
}
