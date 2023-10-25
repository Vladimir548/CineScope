'use client';

import { useQuery } from '@tanstack/react-query';
import { QueryTv } from '@/query/QueryTv';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const DynamicLayoutSwiper = dynamic(
  () => import('@/app/pages-ui/home-page/home-popular/layout-popular/LayoutSwiperTv'),
);

interface ITvIdSimilar {
  title: string;
}

export default function TvIdSimilar({ title }: ITvIdSimilar) {
  const params = useParams();
  const { data, isSuccess, isLoading } = useQuery(['get-id-tv-recommendations', params!.id], () =>
    QueryTv.getIdTvRecommendations(Number(params!.id)),
  );
  return (
    <div>
      <DynamicLayoutSwiper data={data!} title={title} />
    </div>
  );
}
