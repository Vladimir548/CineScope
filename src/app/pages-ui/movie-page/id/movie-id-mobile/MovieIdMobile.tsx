'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { QueryMovie } from '@/query/QueryMovie';
import { usePalette } from '@/app/get-palette/usePalette';
import NextImage from 'next/image';
import { useCertification } from '@/hooks/useCertification';
import { twMerge } from 'tailwind-merge';
import { AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import MovieIdFullInfo from '@/app/pages-ui/movie-page/id/movie-id-mobile/MovieIdFullInfo';
import dynamic from 'next/dynamic';
import { createRef, useEffect, useRef, useState } from 'react';

const DynamicCredits = dynamic(() => import('@/components/tabs/credits-tabs/CreditsTabs'));
const DynamicMovieIdSimilar = dynamic(
  () => import('@/app/pages-ui/movie-page/id/movie-id-mobile/MovieIdSimilar'),
);
const DynamicMovieIdRecommendations = dynamic(
  () => import('@/app/pages-ui/movie-page/id/movie-id-mobile/MovieIdRecommendations'),
);

export default function MovieIdMobile() {
  const params = useParams();
  const { data, isSuccess, isLoading, error } = useQuery(['get-id-movie'], () =>
    QueryMovie.getMovieId(Number(params!.id)),
  );

  const formattedHours = Math.floor(data?.runtime! / 60);
  const formattedMinutes = data?.runtime! % 60;
  const formattedRuntime = `${formattedHours}ч ${formattedMinutes}мин`;
  const certificate = useCertification(
    data?.release_dates?.results?.filter((dates) => dates?.iso_3166_1 === 'US')[0]?.release_dates[0]
      .certification,
  );
  const backdrop = `${process.env.NEXT_PUBLIC_IMAGE_URL}w300/${data?.backdrop_path}`;
  const isPalette = usePalette(backdrop, 2, 1);

  const refComponent = createRef<any>();
  const [isHeightValue, setIsHeightValue] = useState<number>(0);
  useEffect(() => {
    const height = refComponent?.current?.getBoundingClientRect().height;
    setIsHeightValue(height);
  }, [refComponent, isHeightValue]);

  return (
    <div>
      <div
        className="fixed top-0 object-cover "
        style={{
          backgroundImage: `radial-gradient(circle, rgba(${isPalette[0]},1) 28%, rgba(${isPalette[1]},0.7) 94%)`,
        }}
      >
        <div ref={refComponent} className="py-5 px-2 object-cover">
          <NextImage
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}original/${data?.backdrop_path}`}
            alt={data?.title!}
            width={2000}
            height={400}
            sizes={'100vw'}
            className={'rounded-large '}
          />
        </div>
      </div>

      <div
        className={` relative  w-full z-50 bg-[#1a1a1a] rounded-t-lg h-full pb-4 px-2 pt-[15px]`}
        style={{ marginTop: `${isHeightValue}px` }}
      >
        <div className=" flex justify-center  pb-[20px]">
          <span className={'w-[66px] h-[5px] rounded-full bg-[#d9d9d9]'}></span>
        </div>
        <h1 className={'text-[21px] leading-7'}>{data?.title}</h1>
        <h2 className={'text-[#ffffffcc] text-[14px]'}>{data?.original_title}</h2>
        <div className="flex items-center gap-x-2 gap-y-2 flex-wrap text-[#ffffffcc] py-2">
          <div className={twMerge('flex items-center')}>
            <AiOutlineStar /> {data?.vote_average.toFixed(1)}
          </div>
          {certificate && (
            <div className="rounded-full py-0.5 px-2 border-1 border-white text-[12px]">
              {certificate}
            </div>
          )}
          <div className="">{data?.release_date?.split('-')[0]}</div>
          <div className="">{formattedRuntime}</div>
          <div className={'flex items-center gap-x-2  '}>
            {data?.genres.map((genre) => (
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
          <MovieIdFullInfo
            genres={data?.genres}
            vote={data?.vote_average}
            runtime={data?.runtime}
            date={data?.release_date}
            release_dates={data?.release_dates}
            crew={data?.credits?.crew}
            countries={data?.production_countries}
            companies={data?.production_companies}
            budget={data?.budget}
            revenue={data?.revenue}
          />
        </div>
        <div className="pt-2">
          <div className="pb-2">
            <DynamicMovieIdSimilar title={'Похожие'} />
          </div>
          <div className="">
            <DynamicMovieIdRecommendations title={'Рекомендуем посмотреть'} />
          </div>
        </div>
      </div>
    </div>
  );
}
