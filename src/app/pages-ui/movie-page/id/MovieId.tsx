import dynamic from 'next/dynamic';

const DynamicMovieIdPC = dynamic(
  () => import('@/app/pages-ui/movie-page/id/movie-id-pc/MovieIdPC'),
);

export default function MovieId() {
  return (
    <div>
      <DynamicMovieIdPC />
    </div>
  );
}
