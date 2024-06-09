import Anthropic from '@anthropic-ai/sdk';

export function getAnthropic(assistant: any): Anthropic {
  let anthropicAPIKey = process.env.ANTHROPIC_API_KEY
    ? process.env.ANTHROPIC_API_KEY
    : null;

  if (!anthropicAPIKey) {
    throw new Error('Anthropic API key is missing');
  }

  return new Anthropic({
    apiKey: anthropicAPIKey,
  });
}
