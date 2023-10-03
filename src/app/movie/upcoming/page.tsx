import Upcoming from '@/app/pages-ui/movie-page/upcoming/Upcoming';
import MoviePhone from '@/app/pages-ui/mobile-pages/movie-phone-pages/MoviePhone';

export default function Page() {
  return (
    <div>
      <MoviePhone>
        <Upcoming />
      </MoviePhone>
    </div>
  );
}
