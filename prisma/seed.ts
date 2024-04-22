import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const openai = await prisma.modelProvider.upsert({
    where: { id: 'openai' },
    update: {},
    create: {
      id: 'openai',
      name: 'OpenAI',
    },
  });
  const google = await prisma.modelProvider.upsert({
    where: { id: 'google' },
    update: {},
    create: {
      id: 'google',
      name: 'Google',
    },
  });

  const gpt35turbo = await prisma.model.upsert({
    where: { id: 'gpt-3.5-turbo' },
    update: {},
    create: {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      description: 'Currently points to gpt-3.5-turbo-0125',
      url: 'https://platform.openai.com/docs/models/gpt-3-5-turbo',
      providerId: 'openai',
    },
  });
  const gpt35turbo0125 = await prisma.model.upsert({
    where: { id: 'gpt-3.5-turbo-0125' },
    update: {},
    create: {
      id: 'gpt-3.5-turbo-0125',
      name: 'GPT-3.5 Turbo 0125',
      description:
        'Updated The latest GPT-3.5 Turbo model with higher accuracy at responding in requested formats and a fix for a bug which caused a text encoding issue for non-English language function calls. Returns a maximum of 4,096 output tokens.',
      url: 'https://platform.openai.com/docs/models/gpt-3-5-turbo',
      providerId: 'openai',
    },
  });
  const gpt35turbo16k = await prisma.model.upsert({
    where: { id: 'gpt-3.5-turbo-16k' },
    update: {},
    create: {
      id: 'gpt-3.5-turbo-16k',
      name: 'GPT-3.5 Turbo 16K',
      description: '[Legacy] Currently points to gpt-3.5-turbo-16k-0613',
      url: 'https://platform.openai.com/docs/models/gpt-3-5-turbo',
      providerId: 'openai',
    },
  });
  const gpt4 = await prisma.model.upsert({
    where: { id: 'gpt-4' },
    update: {},
    create: {
      id: 'gpt-4',
      name: 'GPT-4',
      description:
        'Currently points to gpt-4-0613. See continuous model upgrades.Snapshot of gpt-4 from June 13th 2023 with improved function calling support.',
      url: 'https://platform.openai.com/docs/models/gpt-4-turbo-and-gpt-4',
      providerId: 'openai',
    },
  });
  const gpt4turbo = await prisma.model.upsert({
    where: { id: 'gpt-4-turbo' },
    update: {},
    create: {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      description:
        'GPT-4 Turbo with Vision. The latest GPT-4 Turbo model with vision capabilities. Vision requests can now use JSON mode and function calling. Currently points to gpt-4-turbo-2024-04-09',
      url: 'https://platform.openai.com/docs/models/gpt-4-turbo-and-gpt-4',
      providerId: 'openai',
    },
  });

  const geminipro = await prisma.model.upsert({
    where: { id: 'gemini-pro' },
    update: {},
    create: {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      description: 'The latest model from Google',
      url: 'https://ai.google.dev/gemini-api/docs/api-overview',
      providerId: 'google',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
