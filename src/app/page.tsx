'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/LoadingScreen';

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function Home() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-600 overflow-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <Scene />
      </Suspense>
    </div>
  );
}
