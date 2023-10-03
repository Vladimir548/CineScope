import MovieNews from '@/app/pages-ui/movie-page/news/MovieNews';
import MoviePhone from '@/app/pages-ui/mobile-pages/movie-phone-pages/MoviePhone';

export default function Page() {
  return (
    <div>
      <MoviePhone>
        <MovieNews />
      </MoviePhone>
    </div>
  );
}
