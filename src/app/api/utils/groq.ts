import { Groq } from 'groq-sdk';

export function getGroq(assistant: any): Groq {
  let groqAPIKey = process.env.GROQ_CLOUD_API_KEY
    ? process.env.GROQ_CLOUD_API_KEY
    : null;

  if (!groqAPIKey) {
    throw new Error('Groq API key is missing');
  }

  return new Groq({
    apiKey: groqAPIKey,
  });
}
