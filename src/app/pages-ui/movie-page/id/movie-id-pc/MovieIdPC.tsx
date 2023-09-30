'use client';
import { useQuery } from '@tanstack/react-query';
import { QueryMovie } from '@/query/QueryMovie';
import { useParams } from 'next/navigation';
import ImageNext from 'next/image';
import style from './style.module.css';
import { usePalette } from 'color-thief-react';

import { BiSolidCircle } from 'react-icons/bi';

import { twMerge } from 'tailwind-merge';
import TabsMovie from '@/components/tabs/TabsMovie';
import LoadingCircular from '@/components/loading/LoadingCircular';
import ReactPlayer from 'react-player';

export default function MovieIdPc() {
  const params = useParams();
  const { data, isSuccess, isLoading, error } = useQuery(['get-id-movie'], () =>
    QueryMovie.getMovieId(Number(params!.id)),
  );
  const formattedHours = Math.floor(data?.runtime! / 60);
  const formattedMinutes = data?.runtime! % 60;
  const formattedRuntime = `${formattedHours}ч ${formattedMinutes}мин`;
  const crossOrigin = 'anonymous';

  const backdrop = `${process.env.NEXT_PUBLIC_IMAGE_URL}w300/${data?.backdrop_path}`;
  const { data: pallete, loading: load } = usePalette(backdrop, 3, 'rgbArray', {
    crossOrigin,
  });
  const colorPalletOne = pallete?.map((item) => item)[0];
  const colorPalletTwo = pallete?.map((item) => item)[1];
  if (isLoading)
    return (
      <div>
        <LoadingCircular />
      </div>
    );
  return (
    <div className=" ">
      <div className={` fixed top-0  object-cover   `}>
        <ImageNext
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}original/${data?.backdrop_path}`}
          alt={data?.title!}
          width={2560}
          height={2000}
          priority
          sizes=" 100vw"
        />
      </div>
      <div className={style.wrapper}>
        <div
          className={style.top_content}
          style={{
            boxShadow: `0px -99px 45px 70px rgba(${colorPalletOne},.8)`,
            backgroundImage: `linear-gradient(to top, rgba(${colorPalletOne},1) 10%, rgba(${colorPalletOne},1) 10%, rgba(${colorPalletOne},.8) 63%)`,
          }}
        >
          <div className={style.poster}>
            <ImageNext
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w342/${data?.poster_path} `}
              alt={data?.title!}
              width={220}
              height={322}
              sizes="220px"
              className={twMerge('object-cover rounded-lg relative z-10', style.poster)}
            />
          </div>
          <div className={style.information}>
            <div className={style.titles}>
              <h1 className={style.title}>{data?.title}</h1>

              <h3 className={style.subtitel}>{data?.original_title}</h3>
            </div>
            <div className={style.block_top_info}>
              <div className={'flex items-center gap-y-3 mt-2'}>
                <div className="px-2 py-2 inline-flex items-center rounded-lg bg-black/50">
                  <span className={'p-1 text-xl bg-cyan-500 rounded-lg '}>TMDB</span>
                  <span className={'text-xl pl-1'}>{data?.vote_average?.toFixed(1)}</span>
                </div>
                <div className="px-2 py-2 inline-flex items-center rounded-lg ml-3 bg-black/50">
                  <span className={'text-xl'}>{data?.release_date}</span>
                  <span className={'text-sm px-1'}>
                    <BiSolidCircle />
                  </span>
                  <span className={'text-xl'}>{formattedRuntime}</span>
                </div>
              </div>
              <ul className="flex items-center mt-3 flex-wrap ">
                {data?.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className={'text-xl p-2 mt-1 rounded-lg mr-2 capitalize bg-black/50'}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={style.content}>
          <div className="sticky top-0 left-0">
            <TabsMovie data={data!} isSuccess={isSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
}
