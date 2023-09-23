'use client';
import { CircularProgress } from '@nextui-org/react';

export default function LoadingCircular() {
  return (
    <div className=" fixed top-0 left-0 w-full h-full z-999">
      <div className="flex justify-center items-center w-full ">
        <CircularProgress size="lg" aria-label="Loading..." />
      </div>
    </div>
  );
}
