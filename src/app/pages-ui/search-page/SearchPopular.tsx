'use client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import LayoutMulti from '@/layout/LayoutMulti';
import React, { useEffect } from 'react';
import { QueryHome } from '@/query/QueryHome';
import LayoutSkeleton from '@/layout/LayoutSkeleton';
import { useSearchParams } from 'next/navigation';
import PaginationComponent from '@/components/pagination/PaginationComponent';

export default function SearchPopular() {
  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';
  const { data, isSuccess, error } = useQuery(
    ['search-multi', pageParams],
    () => QueryHome.getTrending(Number(pageParams)),
    {},
  );

  return (
    <div>
      {isSuccess ? (
        <>
          <LayoutMulti data={data} />
          <PaginationComponent
            total_pages={data?.total_pages}
            pageParams={Number(pageParams)}
            route={'search'}
          />
        </>
      ) : (
        <LayoutSkeleton />
      )}
    </div>
  );
}
