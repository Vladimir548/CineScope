'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryTv } from '@/query/QueryTv';

import { Pagination } from '@nextui-org/react';
import LayoutSkeleton from '@/layout/LayoutSkeleton';
import LayoutTv from '@/layout/LayoutTv';
import { useSearchParams } from 'next/navigation';
import PaginationComponent from '@/components/pagination/PaginationComponent';

export default function Tv() {
  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';
  const { data, error, isSuccess } = useQuery(['get-tv', pageParams], () =>
    QueryTv.getTv(Number(pageParams)),
  );
  return (
    <>
      <div>
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
