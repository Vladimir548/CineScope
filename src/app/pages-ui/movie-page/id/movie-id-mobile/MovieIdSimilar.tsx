'use client';
// import LayoutSwiper from '@/app/pages-ui/home-page/home-popular/layout-popular/LayoutSwiper';
const DynamicLayoutSwiper = dynamic(
  () => import('@/app/pages-ui/home-page/home-popular/layout-popular/LayoutSwiper'),
);
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { QueryMovie } from '@/query/QueryMovie';
import dynamic from 'next/dynamic';

interface IMovieIdSimilar {
  title: string;
}

export default function MovieIdSimilar({ title }: IMovieIdSimilar) {
  const params = useParams();
  const { data, isSuccess, isLoading, error } = useQuery(['get-id-movie-similar', params!.id], () =>
    QueryMovie.getMovieIdSimilar(Number(params!.id)),
  );
  return (
    <div>
      <DynamicLayoutSwiper data={data!} title={title} />
    </div>
  );
}
