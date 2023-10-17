import Movie from '@/app/pages-ui/movie-page/Movie';

import TopFilter from '@/components/top-filter/TopFilter';

export default function Page() {
  return (
    <div>
      <div className={'block md:hidden'}>
        <TopFilter />
      </div>
      <Movie />
    </div>
  );
}
