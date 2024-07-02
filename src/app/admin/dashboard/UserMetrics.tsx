import prisma from '@/app/api/utils/prisma';
import { Card } from 'flowbite-react';

export default function UserMetrics() {
  const getUserCount = async function () {
    let total = await prisma.organization.aggregate({
      where: {
        ownerType: {
          in: ['personal'],
        },
      },
      _count: {
        owner: true,
      },
    });

    return total._count.owner;
  };

  const getOrganizationCount = async function () {
    let total = await prisma.organization.aggregate({
      where: {
        ownerType: {
          notIn: ['personal'],
        },
      },
      _count: {
        owner: true,
      },
    });

    return total._count.owner;
  };

  return (
    <div className={'grid gap-4 xs:grid-flow-row sm:grid-flow-col'}>
      <Card className='flex flex-auto'>
        <h5 className='text-lg tracking-tight text-gray-400 dark:text-white'>
          Users
        </h5>
        <p className='text-7xl text-gray-700 dark:text-gray-400'>
          {getUserCount()}
        </p>
      </Card>
      <Card className='flex flex-auto'>
        <h5 className='text-lg tracking-tight text-gray-400 dark:text-white'>
          Organizations
        </h5>
        <p className='text-7xl text-gray-700 dark:text-gray-400'>
          {getOrganizationCount()}
        </p>
      </Card>
    </div>
  );
}
