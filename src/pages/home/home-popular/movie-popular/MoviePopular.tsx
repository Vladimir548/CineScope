'use client';
import { useQuery } from '@tanstack/react-query';
import { TrendingResponse } from '@/interface/ITrending';
import LayoutPopular from '@/pages/home/home-popular/layout-popular/LayoutPopular';
import { QueryMovie } from '@/query/QueryMovie';

export default function MoviePopular() {
  const { data } = useQuery(['get-popular-movie'], () => QueryMovie.getMoviePopular(), {});
  console.log(data);

  return (
    <div>
      <LayoutPopular data={data!} type={'movie'} title={'Популярные фильмы'} />
    </div>
  );
}
