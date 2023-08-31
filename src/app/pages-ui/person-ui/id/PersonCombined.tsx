'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { QueryPerson } from '@/query/QueryPerson';
import LayoutActorsCredits from '@/layout/LayoutActorsCredits';
import LayoutSkeleton from '@/layout/LayoutSkeleton';
import LayoutPersonCredits from '@/layout/LayoutPersonCredits';

export default function PersonCombined() {
  const params = useParams();
  const { data, isSuccess } = useQuery(['get-actors-id-credits', params!.id], () =>
    QueryPerson.getActorIdCredits(Number(params.id)),
  );

  return <div>{isSuccess ? <LayoutPersonCredits data={data!} /> : <LayoutSkeleton />}</div>;
}
