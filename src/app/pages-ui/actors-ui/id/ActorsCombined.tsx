import { useQuery } from '@tanstack/react-query';
import { QueryPerson } from '@/query/QueryPerson';
import { useParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import LayoutActorsCredits from '@/layout/LayoutActorsCredits';
import LayoutSkeleton from '@/layout/LayoutSkeleton';

export default function ActorsCombined() {
  const params = useParams();
  const { data, isSuccess } = useQuery(['get-actors-id-credits', params!.id], () =>
    QueryPerson.getActorIdCredits(Number(params.id)),
  );

  return <div>{isSuccess ? <LayoutActorsCredits data={data!} /> : <LayoutSkeleton />}</div>;
}
