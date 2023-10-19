'use client';

import { useQuery } from '@tanstack/react-query';
import { QueryMovie } from '@/query/QueryMovie';
import dynamic from 'next/dynamic';

const DynamicLayoutMovie = dynamic(() => import('@/layout/LayoutMovie'), {
  loading: () => <LayoutSkeleton />,
});
import LayoutSkeleton from '@/layout/LayoutSkeleton';
import { useSearchParams } from 'next/navigation';
import PaginationComponent from '@/components/pagination/PaginationComponent';

export default function MovieNews() {
  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';

  const { data, error, isSuccess } = useQuery(['get-movie-news', pageParams], () =>
    QueryMovie.getMovieNews(Number(pageParams)),
  );
  return (
    <>
      <div>
        {isSuccess ? (
          <>
            <DynamicLayoutMovie data={data} isPage={Number(pageParams)} />
            <PaginationComponent
              total_pages={data?.total_pages}
              pageParams={Number(pageParams)}
              route={'movie/news'}
            />
          </>
        ) : (
          <LayoutSkeleton />
        )}
      </div>
    </>
  );
}
