import React from 'react';
import { Card } from 'flowbite-react';
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession()

  return (
    !session ? redirect("api/auth/signin") :
    <div className='bg-grey flex h-[calc(100vh-120px)] items-center justify-center '>
      <Card
        className='max-w-sm'
        imgAlt='Get Started'
        imgSrc='/images/getstarted.png'
      >
        <p className='text-center font-normal text-gray-700 dark:text-gray-400'>
          An Assistant has instructions and can leverage models, tools, and
          knowledge to respond to users through conversations.
        </p>
      </Card>
    </div>
  );
}
