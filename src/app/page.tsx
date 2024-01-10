'use client';

import React from 'react';
import Typewriter from 'typewriter-effect';

export default function Home() {
  return (
    <div className="h-[calc(100vh-120px)] justify-center bg-gray-50 ">
      <section
        className="bg-center bg-cover bg-[url('/landing.png')]">
        <div className="px-4 mx-auto max-w-screen-xl text-left py-24 lg:py-56">
          <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl"><Typewriter
            options={{
              strings: ['Build', 'Deploy', 'Integrate'],
              autoStart: true,
              loop: true,
            }}
          />AI assistants<br/>in minutes.</h1>
        </div>
      </section>
    </div>
  );
}
