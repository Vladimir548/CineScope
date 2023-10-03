import MovieRated from '@/app/pages-ui/movie-page/rated/MovieRated';
import MoviePhone from '@/app/pages-ui/mobile-pages/movie-phone-pages/MoviePhone';

export default function Page() {
  return (
    <div>
      <MoviePhone>
        <MovieRated />
      </MoviePhone>
    </div>
  );
}
