'use client';
import LayoutPopularTv from '@/pages/home/home-popular/layout-popular/LayoutPopularTv';
import { useQuery } from '@tanstack/react-query';
import { QueryTv } from '@/query/QueryTv';

export default function TvPopular() {
  const { data } = useQuery(['get-tv-popular'], () => QueryTv.getTvPopular());
  return (
    <div>
      <LayoutPopularTv data={data} title={'Популярные сериалы'} />
    </div>
  );
}
