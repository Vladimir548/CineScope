import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { QueryMovie } from '@/query/QueryMovie';
import LayoutSwiper from '@/app/pages-ui/home-page/home-popular/layout-popular/LayoutSwiper';

interface IMovieIdRecommendations {
  title: string;
}

export default function MovieIdRecommendations({ title }: IMovieIdRecommendations) {
  const params = useParams();
  const { data, isSuccess, isLoading, error } = useQuery(
    ['get-id-movie-recommendations', params!.id],
    () => QueryMovie.getMovieIdRecommendations(Number(params!.id)),
  );

  return (
    <div>
      <LayoutSwiper data={data!} title={title} />
    </div>
  );
}
