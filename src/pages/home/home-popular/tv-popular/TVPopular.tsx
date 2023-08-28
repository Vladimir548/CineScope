'use client';
import LayoutPopular from '@/pages/home/home-popular/layout-popular/LayoutPopular';
import { useQuery } from '@tanstack/react-query';
import { QueryTv } from '@/query/QueryTv';

export default function TvPopular() {
  const { data } = useQuery(['get-tv-popular'], () => QueryTv.getTvPopular());
  return (
    <div>
      <LayoutPopular data={data} type={'tv'} title={'Популярные сериалы'} />
    </div>
  );
}
