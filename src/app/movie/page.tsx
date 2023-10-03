import Movie from '@/app/pages-ui/movie-page/Movie';
import MoviePhone from '@/app/pages-ui/mobile-pages/movie-phone-pages/MoviePhone';

export default function Page() {
  return (
    <div>
      <MoviePhone>
        <Movie />
      </MoviePhone>
    </div>
  );
}
