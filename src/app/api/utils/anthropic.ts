import Anthropic from '@anthropic-ai/sdk';

export function getAnthropic(assistant: any): Anthropic {
  let anthropicAPIKey = process.env.ANTHROPIC_API_KEY
    ? process.env.ANTHROPIC_API_KEY
    : null;

  if (assistant.modelProviderKey) {
    anthropicAPIKey = assistant.modelProviderKey.key['apiKey'];
  }

  if (!anthropicAPIKey) {
    throw new Error('Anthropic API key is missing');
  }

  return new Anthropic({
    apiKey: anthropicAPIKey,
  });
}
