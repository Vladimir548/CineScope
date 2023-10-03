'use client';

import TopFilter from '@/components/top-filter/TopFilter';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { movieSubLink } from '@/data/SubLink';

interface IMoviePhone {
  children: React.ReactNode;
}

export default function MoviePhone({ children }: IMoviePhone) {
  const pathname = usePathname();

  return (
    <div>
      <div className="block  z-[300] md:hidden ">
        <div>{/*<TopFilter />*/}</div>
        <div
          className={
            'flex justify-between flex-auto border-2 border-[#3f3f46]   max-w-full rounded-lg py-1 px-1 overflow-x-scroll'
          }
        >
          {movieSubLink.map((sub) => (
            <Link
              key={sub.id}
              className={`ease-in-out flex-auto items-center text-center duration-250 rounded-lg px-3 py-2  ${
                sub.link === pathname ? 'bg-zinc-800' : 'bg-transparent'
              } `}
              href={sub.link}
            >
              {sub.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
