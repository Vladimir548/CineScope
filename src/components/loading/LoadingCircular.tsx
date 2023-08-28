'use client';
import { CircularProgress } from '@nextui-org/react';

export default function LoadingCircular() {
  return (
    <div className=" absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 w-[100px] h-[100px]">
      <CircularProgress size="lg" aria-label="Loading..." />
    </div>
  );
}
