'use client';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { IMovie } from '@/interface/IMovieId';
import style from './style.module.css';
import ActingTabs from '@/components/tabs/credits-tabs/acting-tabs/ActingTabs';
import CrewTabs from '@/components/tabs/credits-tabs/crew-tabs/CrewTabs';
import ImageTabs from '@/components/tabs/image-tabs/ImageTabs';
import { twMerge } from 'tailwind-merge';
import CompanyTabs from '@/components/tabs/company-tabs/CompanyTabs';

import CollectionTabsMovie from '@/components/tabs/collection-tabs-movie/CollectionTabsMovie';
import Link from 'next/link';
import { useCertification } from '@/hooks/useCertification';
import ReactPlayer from 'react-player';

interface ITabs {
  data: IMovie;
  isSuccess: boolean;
}

export default function TabsMovie({ data, isSuccess }: ITabs) {
  const formattedHours = Math.floor(data?.runtime! / 60);
  const formattedMinutes = data?.runtime! % 60;
  const formattedRuntime = `${formattedHours}ч ${formattedMinutes}мин`;
  const formattedBudget = data?.budget?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const formattedRevenue = data?.revenue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const certificate = useCertification(
    data?.release_dates?.results?.filter((dates) => dates?.iso_3166_1 === 'US')[0]?.release_dates[0]
      .certification,
  );
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Dynamic tabs"
        classNames={{
          tabList: ' scrollbar-default overflow-x-auto pointer-events-auto',
          tab: 'pointer-events-auto',
        }}
      >
        <Tab className={'text-xl'} key="information" title="Информация">
          <Card>
            <CardBody>
              <div className={'pb-2'}>
                <h3 className={'text-xl'}>Описание</h3>
                <p className={style.text}> {data.overview}</p>
              </div>
              <h3>Полная информация</h3>
              <ul className={style.list}>
                <li className={style.block_info}>
                  <div className={style.text}>Рейтинг</div>
                  <div className={twMerge('flex ', style.text)}>
                    TMDB {data?.vote_average.toFixed(1)}
                  </div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Возраст</div>
                  <div className={twMerge('flex ', style.text)}>{certificate}</div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Жанр</div>
                  <div className="flex flex-wrap">
                    {data?.genres?.map((genre) => (
                      <span key={genre.id}>
                        <p className={twMerge('capitalize pr-2', style.text)}>{genre.name}</p>
                      </span>
                    ))}
                  </div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Время</div>
                  <div className={twMerge('flex ', style.text)}>{formattedRuntime}</div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Дата выхода</div>
                  <div className={twMerge('flex ', style.text)}>{data?.release_date}</div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Режиссер</div>
                  <div className={twMerge('flex flex-wrap', style.text)}>
                    {data?.credits?.crew
                      ?.filter((item) => item.job === 'Director')
                      .map((director) => (
                        <Link key={director.id} href={`/person/${director.id}`}>
                          {' '}
                          {director.name} &nbsp;{' '}
                        </Link>
                      ))}
                  </div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Сценарист</div>
                  <div className={twMerge('flex flex-wrap', style.text)}>
                    {data?.credits?.crew
                      ?.filter((item) => item.job === 'Writer')
                      .map((writer) => (
                        <Link key={writer.id} href={`/person/${writer.id}`}>
                          {' '}
                          {writer.name} &nbsp;{' '}
                        </Link>
                      ))}
                  </div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Бюджет</div>
                  <div className={twMerge('flex ', style.text)}>{formattedBudget}</div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Сборы</div>
                  <div className={twMerge('flex ', style.text)}>{formattedRevenue}</div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Страна</div>
                  <div className="flex flex-wrap">
                    {data?.production_countries.map((country) => (
                      <span className={twMerge('pr-2', style.text)} key={country.iso_3166_1}>
                        {country.name}
                      </span>
                    ))}
                  </div>
                </li>
                <li className={style.block_info}>
                  <div className={style.text}>Компания</div>
                  <div className="flex flex-wrap">
                    {data?.production_companies.map((company) => (
                      <span className={twMerge('pr-2', style.text)} key={company.id}>
                        {company.name}
                      </span>
                    ))}
                  </div>
                </li>

                <li className={style.block_info}>
                  <div className={style.text}>Статус</div>
                  <div className={twMerge('flex', style.text)}>{data?.status}</div>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'text-xl'} key="acting" title="Актеры">
          <Card>
            <CardBody>
              <ActingTabs cast={data?.credits.cast} />
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'text-xl'} key="Crew" title="Фильмография">
          <Card>
            <CardBody>
              <CrewTabs crews={data?.credits.crew} />
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'text-xl'} key="Image" title="Изображения">
          <Card>
            <CardBody>
              <ImageTabs images={data?.images} isSuccess={isSuccess} />
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'text-xl'} key="companies" title="Компания">
          <Card>
            <CardBody>
              <CompanyTabs companies={data?.production_companies} />
            </CardBody>
          </Card>
        </Tab>
        <Tab className={'text-xl'} key="collection" title="Коллекция">
          <Card>
            <CardBody>
              <CollectionTabsMovie collections={data?.belongs_to_collection} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
