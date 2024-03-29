'use client';
import { useQuery } from '@tanstack/react-query';
import { QueryMovie } from '@/query/QueryMovie';
import LayoutMovie from '@/layout/LayoutMovie';
import LayoutSkeleton from '@/layout/LayoutSkeleton';
import { useSearchParams } from 'next/navigation';
import PaginationComponent from '@/components/pagination/PaginationComponent';
import React from 'react';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
import TopFilter from '@/components/top-filter/TopFilter';

export default function Movie() {
  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';
  const { sort } = useTypedSelector((state) => state.sort);
  const { data, error, isSuccess } = useQuery(['get-movie', pageParams, sort], () =>
    QueryMovie.getMovie(Number(pageParams), sort),
  );

  return (
    <>
      <div>
        <div className="hidden md:block">
          <TopFilter />
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
