'use client';
import { useQuery } from '@tanstack/react-query';
import { QueryPerson } from '@/query/QueryPerson';
import LayoutActors from '@/layout/LayoutActors';
import { useSearchParams } from 'next/navigation';
import PaginationComponent from '@/components/pagination/PaginationComponent';
import LayoutSkeleton from '@/layout/LayoutSkeleton';

export default function Actors() {
  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';
  const { data, isSuccess } = useQuery(['get-actors', pageParams], () =>
    QueryPerson.getActors(Number(pageParams)),
  );
  return (
    <div>
      {isSuccess ? (
        <div>
          <LayoutActors data={data!} isPage={Number(pageParams)} />
          <PaginationComponent
            total_pages={data?.total_pages!}
            pageParams={Number(pageParams)}
            route={'actors'}
          />
        </div>
      ) : (
        <LayoutSkeleton />
      )}
    </div>
  );
}
