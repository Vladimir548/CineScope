import MoviePopular from '@/app/pages-ui/home-page/home-popular/movie-popular/MoviePopular';
import TvPopular from '@/app/pages-ui/home-page/home-popular/tv-popular/TVPopular';

export default function HomePopular() {
  return (
    <div>
      <div className="">
        <MoviePopular />
      </div>
      <div className="mt-4">
        <TvPopular />
      </div>
    </div>
  );
}