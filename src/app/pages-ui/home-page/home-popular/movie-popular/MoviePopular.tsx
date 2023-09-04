'use client';
import { useQuery } from '@tanstack/react-query';
import { QueryMovie } from '@/query/QueryMovie';
import LayoutPopularMovie from '../layout-popular/LayoutPopularMovie';

export default function MoviePopular() {
  const { data } = useQuery(['get-popular-movie'], () => QueryMovie.getMoviePopular(), {});

  return (
    <div>
      <LayoutPopularMovie data={data} title={'Новые фильмы'} />
    </div>
  );
}
