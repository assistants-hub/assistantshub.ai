import OpenAI from 'openai';

export function getOpenAI(assistant: any): OpenAI {
  let openAIAPIKey = process.env.OPENAI_API_KEY
    ? process.env.OPENAI_API_KEY
    : null;

  if (!openAIAPIKey) {
    throw new Error('OpenAI API key is missing');
  }

  return new OpenAI({
    apiKey: openAIAPIKey,
  });
}

export function getOpenAIForOrganization(organization: any): OpenAI {
  let openAIAPIKey = process.env.OPENAI_API_KEY
    ? process.env.OPENAI_API_KEY
    : null;

  if (!openAIAPIKey) {
    throw new Error('OpenAI API key missing');
  }

  return new OpenAI({
    apiKey: openAIAPIKey,
  });
}
