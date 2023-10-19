'use client';

import { useQuery } from '@tanstack/react-query';
import { QueryTv } from '@/query/QueryTv';
import dynamic from 'next/dynamic';

const DynamicLayoutTv = dynamic(() => import('@/layout/LayoutTv'), {
  loading: () => <LayoutSkeleton />,
});
import LayoutSkeleton from '@/layout/LayoutSkeleton';
import PaginationComponent from '@/components/pagination/PaginationComponent';
import { useSearchParams } from 'next/navigation';

export default function TvRated() {
  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';
  const { data, error, isSuccess } = useQuery(['get-tv-rated', pageParams], () =>
    QueryTv.getTvRated(Number(pageParams)),
  );
  return (
    <>
      <div>
        {isSuccess ? (
          <>
            <DynamicLayoutTv data={data} isPage={Number(pageParams)} />
            <PaginationComponent
              total_pages={data?.total_pages}
              pageParams={Number(pageParams)}
              route={'tv/rated'}
            />
          </>
        ) : (
          <LayoutSkeleton />
        )}
      </div>
    </>
  );
}
