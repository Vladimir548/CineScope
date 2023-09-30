'use client';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import style from './style.module.css';
import { twMerge } from 'tailwind-merge';
import { ISeries } from '@/interface/ITvId';
import SeasonsTvTabs from '@/app/pages-ui/tv-page/tabs-tv/seasons-tabs/SeasonsTvTabs';
import ActingTvTabs from '@/app/pages-ui/tv-page/tabs-tv/credits-tabs/ActingTvTabs';
import CrewTvTabs from '@/app/pages-ui/tv-page/tabs-tv/credits-tabs/CrewTvTabs';
import SimilarTvTabs from '@/app/pages-ui/tv-page/tabs-tv/similar-tabs/SimilarTvTabs';
import ImagesTvTabs from '@/app/pages-ui/tv-page/tabs-tv/images-tabs/ImagesTvTabs';
import Link from 'next/link';
import { useTypeStatus } from '@/hooks/useTypeStatus';
import { useCertification } from '@/hooks/useCertification';
import ReactPlayer from 'react-player';

interface ITabs {
  data: ISeries;
  isSuccess: boolean;
}

export default function TabsTv({ data, isSuccess }: ITabs) {
  const statusRU = useTypeStatus(data?.status);
  const cetificate = useCertification(
    data?.content_ratings?.results?.filter((res) => res?.iso_3166_1 === 'US')[0]?.rating,
  );

  return (
    <div className="flex w-full flex-col ">
      <Tabs
        aria-label="Dynamic tabs"
        classNames={{
          tabList: ' scrollbar-default overflow-x-auto  ',
        }}
      >
        <Tab className={'text-xl'} key="overview" title="Описание">
          <Card>
            <CardBody className={style.text}>
              {data?.overview}
              {data?.videos.results[0]?.key && (
                <div>
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${data?.videos?.results[0]?.key}`}
                    controls={true}
                    width={'auto'}
                  />
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'text-xl'} key="information" title="Информация">
          <Card>
            <CardBody>
              <ul className={style.list}>
                <li className={style.block_info}>
                  <div className={style.text}>Рейтинг</div>
                  <div className={twMerge('flex ', style.text)}>
                    TMDB {data.vote_average.toFixed(1)}
                  </div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Возраст</div>
                  <div className={twMerge('flex ', style.text)}>{cetificate}</div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Жанр</div>
                  <div className="flex flex-wrap">
                    {data.genres?.map((genre) => (
                      <span key={genre.id}>
                        <p className={twMerge('capitalize pr-2', style.text)}>{genre.name}</p>
                      </span>
                    ))}
                  </div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Время</div>
                  <div className={twMerge('flex ', style.text)}>
                    {data.last_episode_to_air.runtime} мин
                  </div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Сезонов</div>
                  <div className={twMerge('flex ', style.text)}>{data.number_of_seasons}</div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Серий</div>
                  <div className={twMerge('flex ', style.text)}>{data.number_of_episodes}</div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Дата выхода</div>
                  <div className={twMerge('flex ', style.text)}>{data.first_air_date}</div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Дата окончания</div>
                  <div className={twMerge('flex ', style.text)}>{data.last_air_date}</div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Создатель</div>
                  <div className={twMerge('flex flex-wrap', style.text)}>
                    {data.created_by.map((create) => (
                      <Link href={`/person/${create.id}`} key={create.id}>
                        {create.name} &nbsp;
                      </Link>
                    ))}
                  </div>
                </li>

                <li className={style.block_info}>
                  <div className={style.text}>Страна</div>
                  <div className="flex flex-wrap">
                    {data.production_countries.map((country) => (
                      <span className={twMerge('pr-2', style.text)} key={country.iso_3166_1}>
                        {country.name}
                      </span>
                    ))}
                  </div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Платформа</div>
                  <div className={twMerge('flex ', style.text)}>
                    {data.networks.map((network) => (
                      <span key={network.id}>{network.name + ' '}</span>
                    ))}
                  </div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Компания</div>
                  <div className="flex flex-wrap">
                    {data.production_companies.map((company) => (
                      <span className={twMerge('pr-2', style.text)} key={company.id}>
                        {company.name}
                      </span>
                    ))}
                  </div>
                </li>

                <li className={style.block_info}>
                  <div className={style.text}>Статус</div>
                  <div className={twMerge('flex', style.text)}>{statusRU}</div>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'text-xl'} key="seasons" title="Сезоны">
          <Card>
            <CardBody>
              <SeasonsTvTabs seasons={data.seasons} />
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'text-xl'} key="acting" title="Актеры">
          <Card>
            <CardBody>
              <ActingTvTabs />
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'text-xl'} key="Crew" title="Фильмография">
          <Card>
            <CardBody>
              <CrewTvTabs />
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'text-xl'} key="images" title="Изображения">
          <Card>
            <CardBody>
              <ImagesTvTabs images={data.images} isSuccess={isSuccess} />
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'text-xl'} key="similar" title="Похожие">
          <Card>
            <CardBody>
              <SimilarTvTabs />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
      {/*<Tabs className={'overflow-y-none'}>*/}
      {/*  <TabList className={'overflow-x-auto '}>*/}
      {/*    <Tab>One</Tab>*/}
      {/*    <Tab>Two</Tab>*/}
      {/*    <Tab>Three</Tab> <Tab>Three</Tab> <Tab>Three</Tab> <Tab>Three</Tab> <Tab>Three</Tab>*/}
      {/*    <Tab>Three</Tab> <Tab>Three</Tab> <Tab>Three</Tab> <Tab>Three</Tab> <Tab>Three</Tab>*/}
      {/*    <Tab>Three</Tab> <Tab>Three</Tab> <Tab>Three</Tab> <Tab>Three</Tab> <Tab>Three</Tab>*/}
      {/*    <Tab>Three</Tab> <Tab>Three</Tab> <Tab>Three</Tab> <Tab>Three</Tab> <Tab>Three</Tab>*/}
      {/*  </TabList>*/}

      {/*  <TabPanels>*/}
      {/*    <TabPanel>*/}
      {/*      <p>one!</p>*/}
      {/*    </TabPanel>*/}
      {/*    <TabPanel>*/}
      {/*      <p>two!</p>*/}
      {/*    </TabPanel>*/}
      {/*    <TabPanel>*/}
      {/*      <p>three!</p>*/}
      {/*    </TabPanel>*/}
      {/*  </TabPanels>*/}
      {/*</Tabs>*/}
    </div>
  );
}
