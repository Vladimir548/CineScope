import HomePage from '@/pages/home/HomePage';
import { Suspense } from 'react';
import LoadingCircular from '@/components/loading/LoadingCircular';

export default async function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}
