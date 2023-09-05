'use client';
import { useQuery } from '@tanstack/react-query';
import { QueryMovie } from '@/query/QueryMovie';
import LayoutMovie from '@/layout/LayoutMovie';
import LayoutSkeleton from '@/layout/LayoutSkeleton';
import { useSearchParams } from 'next/navigation';
import PaginationComponent from '@/components/pagination/PaginationComponent';
import Link from 'next/link';

export default function Movie() {
  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';
  const { data, error, isSuccess } = useQuery(['get-movie', pageParams], () =>
    QueryMovie.getMovie(Number(pageParams)),
  );

  return (
    <>
      <div>
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
