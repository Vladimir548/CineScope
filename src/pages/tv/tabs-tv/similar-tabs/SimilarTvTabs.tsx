import { useQuery } from '@tanstack/react-query';
import { QueryTv } from '@/query/QueryTv';
import { useParams } from 'next/navigation';
import LayoutTv from '@/layout/LayoutTv';
import LayoutSkeleton from '@/layout/LayoutSkeleton';

export default function SimilarTvTabs() {
  const params = useParams();
  const { data, isSuccess } = useQuery(['get-tv-similar', params!.id], () =>
    QueryTv.getIdTvSimilar(Number(params!.id)),
  );
  return <div>{isSuccess ? <LayoutTv data={data!} /> : <LayoutSkeleton />}</div>;
}
