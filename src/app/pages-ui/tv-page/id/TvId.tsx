'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import ImageNext from 'next/image';
import style from './style.module.css';
import { BiSolidCircle } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import { QueryTv } from '@/query/QueryTv';
import TabsTv from '@/app/pages-ui/tv-page/tabs-tv/TabsTv';
import LoadingCircular from '@/components/loading/LoadingCircular';
import { useEffect, useRef, useState } from 'react';
import { usePalette } from '@/app/get-palette/usePalette';

export default function TvId() {
  const params = useParams();
  const { data, isSuccess, isLoading } = useQuery(['get-id-tv', params!.id], () =>
    QueryTv.getIdTv(Number(params!.id)),
  );
  const backdrop = `${process.env.NEXT_PUBLIC_IMAGE_URL}w300/${data?.backdrop_path}`;
  const isPalette = usePalette(backdrop, 1, 1);
  if (isLoading)
    return (
      <div>
        <LoadingCircular />
      </div>
    );

  return (
    <>
      {isSuccess ? (
        <div className=" ">
          <div className={` fixed top-0  object-cover  `}>
            <ImageNext
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}original/${data?.backdrop_path}`}
              alt={data?.name!}
              width={2000}
              height={700}
              priority={true}
              sizes=" 100vw"
            />
          </div>
          <div className={style.wrapper}>
            <div
              className={style.top_content}
              style={{
                backgroundImage: `linear-gradient(to top, rgba(${isPalette},1) 10%, rgba(${isPalette},1) 10%, rgba(${isPalette},.8) 63%)`,
                boxShadow: `0px -99px 45px 70px rgba(${isPalette},.8)`,
              }}
            >
              <div className={style.poster}>
                <ImageNext
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w342/${data?.poster_path} `}
                  alt={data?.name!}
                  width={220}
                  height={322}
                  className={twMerge('object-cover rounded-lg relative z-10', style.poster)}
                />
              </div>
              <div className={style.information}>
                <div className={style.titles}>
                  <h1 className={style.title}>{data?.name}</h1>
                  <h3 className={style.subtitel}>{data?.original_name}</h3>
                </div>
                <div className={style.block_top_info}>
                  <div className={'flex items-center gap-y-3 mt-2'}>
                    <div className="px-2 py-2 inline-flex items-center rounded-lg bg-black/50">
                      <span className={'p-1 text-xl bg-cyan-500 rounded-lg'}>TMDB</span>
                      <span className={'text-xl pl-1'}>{data?.vote_average?.toFixed(1)}</span>
                    </div>
                    <div className="px-2 py-2 inline-flex items-center rounded-lg ml-3 bg-black/50">
                      <span className={'text-xl'}>{data?.first_air_date}</span>
                      <span className={'text-sm px-1'}>
                        <BiSolidCircle />
                      </span>
                      <span className={'text-xl'}>{data.episode_run_time}</span>
                    </div>
                  </div>
                  <ul className="flex items-center mt-3 flex-wrap ">
                    {data?.genres.map((genre) => (
                      <li
                        key={genre.id}
                        className={'text-xl p-2 rounded-lg mr-2 mt-1 capitalize bg-black/50'}
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
                <TabsTv data={data} isSuccess={isSuccess} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span>FFFFFFFF</span>
      )}
    </>
  );
}
