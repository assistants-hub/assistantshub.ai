import React from 'react';
import { Header } from '@/components/Header';
import { PageFooter } from '@/components/Footer';
import Home from '@/components/Home';
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
