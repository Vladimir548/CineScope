'use client';
import { useQuery } from '@tanstack/react-query';
import { QueryTv } from '@/query/QueryTv';
import LayoutSkeleton from '@/layout/LayoutSkeleton';
import LayoutTv from '@/layout/LayoutTv';
import { useSearchParams } from 'next/navigation';
import PaginationComponent from '@/components/pagination/PaginationComponent';
import Link from 'next/link';

interface ILinkTv {
  id: number;
  name: string;
  link: string;
}

const linkTv: ILinkTv[] = [
  {
    id: 1,
    name: 'Поплуярное',
    link: '/tv/popular',
  },
  {
    id: 2,
    name: 'Новинки',
    link: '/tv/news',
  },
  {
    id: 3,
    name: 'Рейтинговые',
    link: '/tv/rated',
  },
];
export default function Tv() {
  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';
  const { data, error, isSuccess } = useQuery(['get-tv', pageParams], () =>
    QueryTv.getTv(Number(pageParams)),
  );
  return (
    <>
      <div>
        <div className="flex mt-2 gap-x-1 overflow-x-auto">
          {linkTv.map((link) => (
            <Link
              className={'bg-transparent outline-0 border-2 rounded-lg border-slate-700 px-2 py-2 '}
              key={link.id}
              href={link.link}
            >
              {link.name}
            </Link>
          ))}
        </div>
        {isSuccess ? (
          <>
            <LayoutTv data={data} isPage={Number(pageParams)} />
            <PaginationComponent
              total_pages={data?.total_pages}
              pageParams={Number(pageParams)}
              route={'tv'}
            />
          </>
        ) : (
          <LayoutSkeleton />
        )}
      </div>
    </>
  );
}
