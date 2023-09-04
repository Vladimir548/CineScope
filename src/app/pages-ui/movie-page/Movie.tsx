'use client';
import { useQuery } from '@tanstack/react-query';
import { QueryMovie } from '@/query/QueryMovie';
import LayoutMovie from '@/layout/LayoutMovie';
import LayoutSkeleton from '@/layout/LayoutSkeleton';
import { useSearchParams } from 'next/navigation';
import PaginationComponent from '@/components/pagination/PaginationComponent';
import Link from 'next/link';

interface ILinkMovie {
  id: number;
  name: string;
  link: string;
}

const linkMovie: ILinkMovie[] = [
  {
    id: 1,
    name: 'Поплуярное',
    link: '/movie/popular',
  },
  {
    id: 2,
    name: 'Новинки',
    link: '/movie/news',
  },
  {
    id: 3,
    name: 'Рейтинговые',
    link: '/movie/rated',
  },
];
export default function Movie() {
  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';
  const { data, error, isSuccess } = useQuery(['get-movie', pageParams], () =>
    QueryMovie.getMovie(Number(pageParams)),
  );

  return (
    <>
      <div>
        <div className="flex mt-2 gap-x-1 overflow-x-auto">
          {linkMovie.map((link) => (
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
            <LayoutMovie data={data} isPage={Number(pageParams)} />
            <PaginationComponent
              total_pages={data?.total_pages}
              pageParams={Number(pageParams)}
              route={'movie'}
            />
          </>
        ) : (
          <LayoutSkeleton />
        )}
      </div>
    </>
  );
}
