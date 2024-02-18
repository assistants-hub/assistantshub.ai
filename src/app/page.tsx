import React from 'react';
import { Header } from '@/components/header';
import { PageFooter } from '@/components/footer';
import Home from '@/components/home';
import 'highlight.js/styles/github.css';

export default function Landing() {
  return (
    <div className={'bg-gray-50 dark:bg-gray-900'}>
      <Header />
      <Home />
      <PageFooter />
    </div>
  );
}
