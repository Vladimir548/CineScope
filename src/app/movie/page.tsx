import Movie from '@/app/pages-ui/movie-page/Movie';

import TopFilter from '@/components/top-filter/TopFilter';

export default function Page() {
  return (
    <div>
      <TopFilter />
      <Movie />
    </div>
  );
}
