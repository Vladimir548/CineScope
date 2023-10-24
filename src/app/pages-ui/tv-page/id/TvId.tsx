'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import ImageNext from 'next/image';
import style from './style.module.css';
import { BiSolidCircle } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import { QueryTv } from '@/query/QueryTv';
import LoadingCircular from '@/components/loading/LoadingCircular';
import { usePalette } from '@/app/get-palette/usePalette';
import { createRef, useEffect, useState } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { useCertification } from '@/hooks/useCertification';
import dynamic from 'next/dynamic';
import TvSeasons from '@/app/pages-ui/tv-page/id/TvSeasons';
import TvIdFullInfo from '@/app/pages-ui/tv-page/id/TvIdFullInfo';

const DynamicCredits = dynamic(() => import('@/components/tabs/credits-tabs/CreditsTabs'));
const DynamicTvIdSimilar = dynamic(() => import('@/app/pages-ui/tv-page/id/TvIdSimilar'));
export default function TvId() {
  const params = useParams();
  const { data, isSuccess, isLoading } = useQuery(['get-id-tv', params!.id], () =>
    QueryTv.getIdTv(Number(params!.id)),
  );
  const backdrop = `${process.env.NEXT_PUBLIC_IMAGE_URL}w300/${data?.backdrop_path}`;
  const isPalette = usePalette(backdrop, 1, 1);

  const certificate = useCertification(
    data?.content_ratings?.results?.filter((dates) => dates?.iso_3166_1 === 'US')[0].rating,
  );
  const refComponent = createRef<any>();
  const [isHeightValue, setIsHeightValue] = useState<number>(0);
  useEffect(() => {
    const height = refComponent?.current?.getBoundingClientRect().height;
    setIsHeightValue(height);
  }, [refComponent, isHeightValue]);
  if (isLoading)
    return (
      <div>
        <LoadingCircular />
      </div>
    );

  return (
    <div>
      <div className=" ">
        <div ref={refComponent} className={` fixed top-0  object-cover  `}>
          <ImageNext
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}original/${data?.backdrop_path}`}
            alt={data?.name!}
            width={2000}
            height={500}
            sizes=" 100vw"
            className={'max-h-[500px] object-cover'}
          />
        </div>
      </div>
      <div
        className={` relative  w-full z-50 bg-[#1a1a1a] rounded-t-lg h-full pb-4 px-2 pt-[15px]`}
        style={{
          marginTop: `${isHeightValue}px`,
        }}
      >
        <div className=" flex justify-center  pb-[20px]">
          <span className={'w-[66px] h-[5px] rounded-full bg-[#d9d9d9]'}></span>
        </div>
        <h1 className={'text-[21px] leading-7'}>{data?.name}</h1>
        <h2 className={'text-[#ffffffcc] text-[14px]'}>{data?.original_name}</h2>
        <div className="flex items-center gap-x-2 gap-y-2 flex-wrap text-[#ffffffcc] py-2">
          <div className={twMerge('flex items-center')}>
            <AiOutlineStar /> {data?.vote_average?.toFixed(1)}
          </div>
          {certificate && (
            <div className="rounded-full py-0.5 px-2 border-1 border-white text-[12px]">
              {certificate}
            </div>
          )}
          <div className="">{data?.first_air_date?.split('-')[0]}</div>

          <div className="">{data?.episode_run_time}</div>
          <div className={'flex items-center gap-x-2  '}>
            {data?.genres?.map((genre) => (
              <div
                className="rounded-full py-0.5 px-2 border-1 border-white text-[12px]"
                key={genre.id}
              >
                {genre.name}
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h3 className="text-lg">Описание</h3>
          <p className="leading-5 text-[#6b6c72]">{data?.overview}</p>
        </div>
        <div className="py-2 ">
          <DynamicCredits cast={data?.credits?.cast!} crew={data?.credits?.crew!} />
        </div>
        <div className="">
          <h3 className="text-lg">Сезоны</h3>
          <TvSeasons seasons={data?.seasons} />
        </div>
        <div className="">
          <TvIdFullInfo
            genres={data?.genres}
            vote={data?.vote_average}
            runtime={Number(data?.episode_run_time)}
            date={data?.first_air_date}
            certificate={certificate}
            created={data?.created_by}
            countries={data?.production_countries}
            companies={data?.production_companies}
          />
        </div>
        {/*<div className="pt-2">*/}
        {/*<div className="pb-2">*/}
        {/*  <DynamicTvIdSimilar title={'Похожие'} />*/}
        {/*</div>*/}
        {/*  <div className="">*/}
        {/*    <DynamicMovieIdRecommendations title={'Рекомендуем посмотреть'} />*/}
        {/*  </div>*/}
      </div>
    </div>
  );
}
