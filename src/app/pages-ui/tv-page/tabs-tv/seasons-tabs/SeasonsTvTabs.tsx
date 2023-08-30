'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { QueryTv } from '@/query/QueryTv';
import { ITvSeason } from '@/interface/ITvId';
import { useState } from 'react';
import { Tabs, Tab, Card, CardBody, Image, ScrollShadow, Skeleton } from '@nextui-org/react';
import NextImage from 'next/image';
import LayoutSeasonsSkeleton from '@/layout/LayoutSeasonsSkeleton';

interface ISeasonsTabs {
  seasons: ITvSeason[];
}

export default function SeasonsTvTabs({ seasons }: ISeasonsTabs) {
  const params = useParams();
  const [isSeason, setIsSeason] = useState<number>(1);
  const { data, isSuccess } = useQuery(['get-seasons', params!.id, isSeason], () =>
    QueryTv.getIdTvSeasons(Number(params!.id), isSeason),
  );
  return (
    <div>
      <div className="flex w-full flex-col">
        <Tabs
          classNames={{
            tabList: ' scrollbar-default overflow-x-auto snap-mandatory snap-x',
          }}
          onSelectionChange={(key) => setIsSeason(Number(key))}
          aria-label="Dynamic tabs"
        >
          {seasons.map((season) => (
            <Tab
              className={'text-xl snap-center'}
              key={season.season_number}
              title={season.season_number !== 0 ? `Сезон ${season.season_number}` : season.name}
            >
              <Card>
                {isSuccess ? (
                  <CardBody>
                    {data?.episodes.map((episode) => (
                      <Card
                        key={episode.id}
                        className="border-none  dark:bg-default-100/50 mb-2"
                        shadow="sm"
                      >
                        <CardBody>
                          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                            <div className="relative col-span-6 md:col-span-3">
                              <Image
                                as={NextImage}
                                alt={episode.name}
                                className="object-cover"
                                height={185}
                                shadow="md"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}original/${episode.still_path}`}
                                width={500}
                              />
                            </div>

                            <div className="flex flex-col col-span-6 md:col-span-9">
                              <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-0">
                                  <h2 className="font-bold ">{episode.name}</h2>

                                  <span>Серия {episode.episode_number}</span>

                                  <h3 className="text-md text-foreground/80">{episode.air_date}</h3>

                                  <p
                                    className={
                                      'font-normal text-medium overflow-y-auto max-h-[100px]'
                                    }
                                  >
                                    {episode.overview}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </CardBody>
                ) : (
                  <LayoutSeasonsSkeleton />
                )}
              </Card>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
