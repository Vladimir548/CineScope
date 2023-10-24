'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { QueryTv } from '@/query/QueryTv';
import { ITvSeason } from '@/interface/ITvId';
import { useState } from 'react';
import { Tabs, Tab, Card, CardBody, Image, ScrollShadow, Skeleton } from '@nextui-org/react';
import NextImage from 'next/image';
import LayoutSeasonsSkeleton from '@/layout/LayoutSeasonsSkeleton';
import LayoutSeasons from '@/app/pages-ui/home-page/home-popular/layout-popular/LayoutSeasons';

interface ISeasonsTabs {
  seasons?: ITvSeason[];
}

export default function SeasonsTvTabs({ seasons }: ISeasonsTabs) {
  const params = useParams();
  const [isSeason, setIsSeason] = useState<number>(1);
  const { data, isSuccess, isLoading } = useQuery(['get-seasons', params!.id, isSeason], () =>
    QueryTv.getIdTvSeasons(Number(params!.id), isSeason),
  );
  return (
    <div>
      <div className="flex w-full flex-col ">
        <Tabs
          classNames={{
            tabList: ' scrollbar-default overflow-x-auto pointer-events-auto',
            tab: 'pointer-events-auto',
            base: 'p-0',
          }}
          onSelectionChange={(key) => setIsSeason(Number(key))}
          aria-label="Dynamic tabs"
        >
          {seasons?.map((season) => (
            <Tab
              className={'text-md snap-center '}
              key={season.season_number}
              title={season.season_number !== 0 ? `Сезон ${season.season_number}` : season.name}
            >
              <Card>{isSuccess ? <LayoutSeasons data={data} /> : <LayoutSeasonsSkeleton />}</Card>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
