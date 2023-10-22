import dynamic from 'next/dynamic';
import MovieIdMobile from '@/app/pages-ui/movie-page/id/movie-id-mobile/MovieIdMobile';

const DynamicMovieIdPC = dynamic(
  () => import('@/app/pages-ui/movie-page/id/movie-id-pc/MovieIdPC'),
);

export default function MovieId() {
  return (
    <div>
      <MovieIdMobile />
    </div>
  );
}
