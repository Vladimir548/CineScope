'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryMovie } from '@/query/QueryMovie';
import LayoutMovie from '@/layout/LayoutMovie';
import { Pagination } from '@nextui-org/react';
import LayoutSkeleton from '@/layout/LayoutSkeleton';
import PaginationComponent from '@/components/pagination/PaginationComponent';
import { useSearchParams } from 'next/navigation';

export default function MovieRated() {
  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';
  const { data, error, isSuccess } = useQuery(['get-movie-rated', pageParams], () =>
    QueryMovie.getMovieRated(Number(pageParams)),
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
              route={'movie/rated'}
            />
          </>
        ) : (
          <LayoutSkeleton />
        )}
      </div>
    </>
  );
}
