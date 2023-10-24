import SeasonsTvTabs from '@/app/pages-ui/tv-page/tabs-tv/seasons-tabs/SeasonsTvTabs';
import { ITvSeason } from '@/interface/ITvId';

interface ITvSeasons {
  seasons?: ITvSeason[];
}

export default function TvSeasons({ seasons }: ITvSeasons) {
  return (
    <div className={'py-2'}>
      <SeasonsTvTabs seasons={seasons} />
    </div>
  );
}
