'use client'
import dynamic from 'next/dynamic';
/* eslint-disable */

const MoonCanvas = dynamic(() => import('@/components/MoonCanvas'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <MoonCanvas />
    </div>
  )
}
