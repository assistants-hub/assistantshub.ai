import { PrismaClient, Prisma } from '@prisma/client';

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
  const groq = await prisma.modelProvider.upsert({
    where: { id: 'groq' },
    update: {},
    create: {
      id: 'groq',
      name: 'Groq',
    },
  });

  const gpt35turbo = await prisma.model.upsert({
    where: { id: 'gpt-3.5-turbo' },
    update: {
      features: {
        retrieval: true,
      } as Prisma.JsonObject
    },
    create: {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      description: 'Currently points to gpt-3.5-turbo-0125',
      url: 'https://platform.openai.com/docs/models/gpt-3-5-turbo',
      providerId: 'openai',
      features: {
        retrieval: true,
      } as Prisma.JsonObject
    },
  });
  const gpt35turbo0125 = await prisma.model.upsert({
    where: { id: 'gpt-3.5-turbo-0125' },
    update: {
      features: {
        retrieval: true,
      } as Prisma.JsonObject
    },
    create: {
      id: 'gpt-3.5-turbo-0125',
      name: 'GPT-3.5 Turbo 0125',
      description:
        'Updated The latest GPT-3.5 Turbo model with higher accuracy at responding in requested formats.',
      url: 'https://platform.openai.com/docs/models/gpt-3-5-turbo',
      providerId: 'openai',
      features: {
        retrieval: true,
      } as Prisma.JsonObject
    },
  });
  const gpt35turbo16k = await prisma.model.upsert({
    where: { id: 'gpt-3.5-turbo-16k' },
    update: {
      features: {
        retrieval: true,
      } as Prisma.JsonObject
    },
    create: {
      id: 'gpt-3.5-turbo-16k',
      name: 'GPT-3.5 Turbo 16K',
      description: '[Legacy] Currently points to gpt-3.5-turbo-16k-0613',
      url: 'https://platform.openai.com/docs/models/gpt-3-5-turbo',
      providerId: 'openai',
      features: {
        retrieval: true,
      } as Prisma.JsonObject
    },
  });
  const gpt4 = await prisma.model.upsert({
    where: { id: 'gpt-4' },
    update: {
      features: {
        retrieval: true,
      } as Prisma.JsonObject
    },
    create: {
      id: 'gpt-4',
      name: 'GPT-4',
      description:
        'Currently points to gpt-4-0613. See continuous model upgrades.Snapshot of gpt-4 from June 13th 2023 with improved function calling support.',
      url: 'https://platform.openai.com/docs/models/gpt-4-turbo-and-gpt-4',
      providerId: 'openai',
      features: {
        retrieval: true,
      } as Prisma.JsonObject
    },
  });
  const gpt4turbo = await prisma.model.upsert({
    where: { id: 'gpt-4-turbo' },
    update: {
      features: {
        retrieval: true,
      } as Prisma.JsonObject
    },
    create: {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      description:
        'GPT-4 Turbo with Vision. The latest GPT-4 Turbo model with vision capabilities. Vision requests can now use JSON mode and function calling. Currently points to gpt-4-turbo-2024-04-09',
      url: 'https://platform.openai.com/docs/models/gpt-4-turbo-and-gpt-4',
      providerId: 'openai',
      features: {
        retrieval: true,
      } as Prisma.JsonObject
    },
  });

  const geminipro = await prisma.model.upsert({
    where: { id: 'gemini-1.5-pro-latest' },
    update: {
      features: {
        retrieval: false,
      } as Prisma.JsonObject
    },
    create: {
      id: 'gemini-1.5-pro-latest',
      name: 'Gemini Pro 1.5',
      description: 'The latest model from Google',
      url: 'https://ai.google.dev/gemini-api/docs/api-overview',
      providerId: 'google',
      features: {
        retrieval: false,
      } as Prisma.JsonObject
    },
  });

  const groq_llama3_8b = await prisma.model.upsert({
    where: { id: 'llama3-8b-8192' },
    update: {
      features: {
        retrieval: false,
      } as Prisma.JsonObject
    },
    create: {
      id: 'llama3-8b-8192',
      name: 'LLaMA3 8b',
      description:
        'The Llama 3 instruction tuned models are optimized for dialogue use cases and outperform many of the available open source chat models on common industry benchmarks.',
      url: 'https://console.groq.com/docs/models#llama3-8b',
      providerId: 'groq',
      features: {
        retrieval: false,
      } as Prisma.JsonObject
    },
  });

  const groq_llama3_70b = await prisma.model.upsert({
    where: { id: 'llama3-70b-8192' },
    update: {
      features: {
        retrieval: false,
      } as Prisma.JsonObject
    },
    create: {
      id: 'llama3-70b-8192',
      name: 'LLaMA3 70b',
      description:
        'The Llama 3 instruction tuned models are optimized for dialogue use cases and outperform many of the available open source chat models on common industry benchmarks. ',
      url: 'https://console.groq.com/docs/models#llama3-70b',
      providerId: 'groq',
      features: {
        retrieval: false,
      } as Prisma.JsonObject
    },
  });

  const groq_mixtral_7b = await prisma.model.upsert({
    where: { id: 'mixtral-8x7b-32768' },
    update: {
      features: {
        retrieval: false,
      } as Prisma.JsonObject
    },
    create: {
      id: 'mixtral-8x7b-32768',
      name: 'Mistral 8x7b',
      description:
        'The Mixtral-8x7B Large Language Model (LLM) is a pretrained generative Sparse Mixture of Experts. The Mixtral-8x7B outperforms Llama 2 70B on most benchmarks we tested.',
      url: 'https://console.groq.com/docs/models#mixtral-8x7b',
      providerId: 'groq',
      features: {
        retrieval: false,
      } as Prisma.JsonObject
    },
  });

  const groq_gemma_7b = await prisma.model.upsert({
    where: { id: 'gemma-7b-it' },
    update: {
      features: {
        retrieval: false,
      } as Prisma.JsonObject
    },
    create: {
      id: 'gemma-7b-it',
      name: 'Google Gemma 7B',
      description:
        'Gemma models are well-suited for a variety of text generation tasks, including question answering, summarization, and reasoning.',
      url: 'https://console.groq.com/docs/models#gemma-7b',
      providerId: 'groq',
      features: {
        retrieval: false,
      } as Prisma.JsonObject
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
