import MoviePopular from '@/app/pages-ui/movie-page/popular/MoviePopular';
import MoviePhone from '@/app/pages-ui/mobile-pages/movie-phone-pages/MoviePhone';

export default function Page() {
  return (
    <div>
      <MoviePhone>
        <MoviePopular />
      </MoviePhone>
    </div>
  );
}
