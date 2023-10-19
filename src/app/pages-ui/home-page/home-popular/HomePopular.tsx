import dynamic from 'next/dynamic';
import LoadingCircular from '@/components/loading/LoadingCircular';

const DynamicMoviePopular = dynamic(
  () => import('@/app/pages-ui/home-page/home-popular/movie-popular/MoviePopular'),
  { loading: () => <LoadingCircular /> },
);
const DynamicTvPopular = dynamic(
  () => import('@/app/pages-ui/home-page/home-popular/tv-popular/TVPopular'),
  { loading: () => <LoadingCircular /> },
);
export default function HomePopular() {
  return (
    <div>
      <div className="">
        <DynamicMoviePopular />
      </div>
      <div className="mt-4">
        <DynamicTvPopular />
      </div>
    </div>
  );
}
