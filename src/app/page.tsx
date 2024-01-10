'use client';

import React from 'react';
import { Alert } from 'flowbite-react';

export default function Home() {
  return (
    <div>
      <section
        className="bg-center bg-cover bg-[url('/landing.png')]">
        <div className="px-4 mx-auto max-w-screen-xl text-left py-24 lg:py-56">
          <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text md:text-5xl lg:text-6xl">Build
            <br/>AI assistants<br/>in minutes.</h1>
        </div>
      </section>
    </div>
  );
}
