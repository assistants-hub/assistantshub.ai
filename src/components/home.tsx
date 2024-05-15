'use client';

import React from 'react';
import Typewriter from 'typewriter-effect';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='justify-center bg-gray-50 pb-1'>
      <div className='grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5'>
        <div className='flex px-4 py-24 text-left sm:col-span-1 md:col-span-2 lg:col-span-1 lg:py-56'>
          <h1 className='mx-auto mb-4 text-5xl font-normal leading-none tracking-tight xl:text-6xl'>
            <Typewriter
              options={{
                strings: ['Build', 'Deploy', 'Integrate'],
                autoStart: true,
                loop: true,
              }}
            />
            AI assistants
            <br />
            in minutes.
          </h1>
        </div>
        <div className='flex sm:col-span-1 md:col-span-4'>
          <Image
            className='m-auto'
            src='/landing.jpg'
            alt='Welcome'
            width='3000'
            height='1688'
          />
        </div>
      </div>
    </div>
  );
}
