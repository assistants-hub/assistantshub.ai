// utils/csrf.ts
import csrf from 'csrf';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/api/utils/prisma';

export const csrfToken = async (
  req: NextRequest,
  res: NextResponse
): Promise<string> => {
  const tokens = new csrf();

  let result = await prisma.system.upsert({
    where: {
      id: 'system',
    },
    create: {
      id: 'system',
      csrfToken: tokens.secretSync(),
      currentStep: 0,
      adminUserCreated: false,
      agreeToTerms: false,
    },
    update: {
      id: 'system',
    },
  });

  let system = await prisma.system.findFirst({
    where: {
      id: 'system',
    },
  });

  // @ts-ignore
  return tokens.create(system?.csrfToken);
};

export const verifyCsrfToken = async (incoming: string): Promise<boolean> => {
  try {
    const tokens = new csrf();

    let system = await prisma.system.findFirst({
      where: {
        id: 'system',
      },
    });

    // @ts-ignore
    let token = tokens.create(system?.csrfToken);
    return !tokens.verify(incoming, token);
  } catch (e) {
    return false;
  }
};
