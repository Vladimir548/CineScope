import MoviePopular from '@/app/pages-ui/home-page/home-popular/movie-popular/MoviePopular';
import TvPopular from '@/app/pages-ui/home-page/home-popular/tv-popular/TVPopular';
import dynamic from 'next/dynamic';

const DynamicMoviePopular = dynamic(
  () => import('@/app/pages-ui/home-page/home-popular/movie-popular/MoviePopular'),
  {},
);
const DynamicTvPopular = dynamic(
  () => import('@/app/pages-ui/home-page/home-popular/tv-popular/TVPopular'),
  {},
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
