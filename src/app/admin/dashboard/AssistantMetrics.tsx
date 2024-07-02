import prisma from '@/app/api/utils/prisma';
import { Card } from 'flowbite-react';

export default function AssistantMetrics() {
  const getAssistantCount = async function () {
    let total = await prisma.assistant.aggregate({
      _count: {
        id: true,
      },
    });

    return total._count.id;
  };

  const getThreadCount = async function () {
    let total = await prisma.thread.aggregate({
      _count: {
        id: true,
      },
    });

    return total._count.id;
  };

  const getMessageCount = async function () {
    let total = await prisma.message.aggregate({
      _count: {
        id: true,
      },
    });

    return total._count.id;
  };

  return (
    <div className={'grid gap-4 xs:grid-flow-row sm:grid-flow-col'}>
      <Card className='flex flex-auto'>
        <h5 className='text-lg tracking-tight text-gray-400 dark:text-white'>
          Assistants
        </h5>
        <p className='text-7xl text-gray-700 dark:text-gray-400'>
          {getAssistantCount()}
        </p>
      </Card>
      <Card className='flex flex-auto'>
        <h5 className='text-lg tracking-tight text-gray-400 dark:text-white'>
          Threads
        </h5>
        <p className='text-7xl text-gray-700 dark:text-gray-400'>
          {getThreadCount()}
        </p>
      </Card>
      <Card className='flex flex-auto'>
        <h5 className='text-lg tracking-tight text-gray-400 dark:text-white'>
          Messages
        </h5>
        <p className='text-7xl text-gray-700 dark:text-gray-400'>
          {getMessageCount()}
        </p>
      </Card>
    </div>
  );
}
