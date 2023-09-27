'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { QueryMovie } from '@/query/QueryMovie';
import LayoutMovie from '@/layout/LayoutMovie';
import PaginationComponent from '@/components/pagination/PaginationComponent';
import LayoutSkeleton from '@/layout/LayoutSkeleton';

export default function Upcoming() {
  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';
  const { data, error, isSuccess } = useQuery(['get-movie-upcoming', pageParams], () =>
    QueryMovie.getMovieUpcoming(Number(pageParams)),
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
              route={'movie/upcoming'}
            />
          </>
        ) : (
          <LayoutSkeleton />
        )}
      </div>
    </>
  );
}
