import { GoogleGenerativeAI } from '@google/generative-ai';

export function getGoogleGenerativeAI(assistant: any): GoogleGenerativeAI {
  let googleAIStudioAPIKey = process.env.GOOGLE_AI_STUDIO_API_KEY
    ? process.env.GOOGLE_AI_STUDIO_API_KEY
    : null;

  if (!googleAIStudioAPIKey) {
    throw new Error('Google AI Studio API key is missing');
  }

  return new GoogleGenerativeAI(googleAIStudioAPIKey);
}
