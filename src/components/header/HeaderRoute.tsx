'use client';

import { useRouter } from 'next/navigation';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

export default function HeaderRoute() {
  const router = useRouter();
  return (
    <div className="flex gap-y-4 items-center">
      <span
        className=" rounded-full p-2 cursor-pointer bg-slate-600/60 ease-in-out duration-300 hover:bg-slate-800/60 backdrop-blur"
        onClick={() => router.back()}
      >
        <BiSolidLeftArrow size={16} />
      </span>
      <span
        className="rounded-full p-2 cursor-pointer bg-slate-600/60 ease-in-out duration-300 hover:bg-slate-800/60"
        onClick={() => router.forward()}
      >
        <BiSolidRightArrow size={16} />
      </span>
    </div>
  );
}
