'use client';

import React from 'react';
import { Card } from 'flowbite-react';

export default function Page() {
  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center bg-grey ">
      <Card
        className="max-w-sm"
        imgAlt="Get Started"
        imgSrc="/images/getstarted.png"
      >
        <p className="font-normal text-gray-700 text-center dark:text-gray-400">
          An Assistant has instructions and can leverage models, tools, and knowledge to respond to users through conversations.
        </p>
      </Card>
    </div>
  );
}
