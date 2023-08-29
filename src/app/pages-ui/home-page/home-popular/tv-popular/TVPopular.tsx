'use client';
import { useQuery } from '@tanstack/react-query';
import { QueryTv } from '@/query/QueryTv';
import LayoutPopularTv from '@/app/pages-ui/home-page/home-popular/layout-popular/LayoutPopularTv';

export default function TvPopular() {
  const { data } = useQuery(['get-tv-popular'], () => QueryTv.getTvPopular());
  return (
    <div>
      <LayoutPopularTv data={data} title={'Популярные сериалы'} />
    </div>
  );
}
