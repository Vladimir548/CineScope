'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import ImageNext from 'next/image';
import style from './style.module.css';
import { usePalette } from 'color-thief-react';
import { BiSolidCircle } from 'react-icons/bi';
import { Image } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import { QueryTv } from '@/query/QueryTv';
import TabsTv from '@/pages/tv/tabs-tv/TabsTv';

export default function TvId() {
  const params = useParams();
  const { data, isSuccess } = useQuery(['get-id-tv', params!.id], () =>
    QueryTv.getIdTv(Number(params!.id)),
  );
  console.log(data);
  const crossOrigin = 'anonymous';
  const backdrop = `${process.env.NEXT_PUBLIC_IMAGE_URL}w300/${data?.backdrop_path}`;
  const { data: pallete, loading: load } = usePalette(backdrop, 3, 'rgbArray', {
    crossOrigin,
  });
  const colorPalletOne = pallete?.map((item) => item)[0];
  const colorPalletTwo = pallete?.map((item) => item)[1];

  if (!data) return <div>Данные не найдены</div>;
  return (
    <div className=" ">
      <div className="w-[100vmax]">
        <Image
          as={ImageNext}
          isBlurred
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}original/${data?.backdrop_path}`}
          alt={data?.name!}
          width={2000}
          height={700}
          priority={true}
          className={`fixed top-0   `}
        />
      </div>
      <div className={style.wrapper}>
        <div
          className={style.top_content}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(${colorPalletOne},.6) 90%, rgba(0,0,0,.9) 100%`,
          }}
        >
          <div className={style.poster}>
            <ImageNext
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w342/${data?.poster_path} `}
              alt={data?.name!}
              width={220}
              height={322}
              quality={100}
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
                <div
                  style={{ backgroundColor: `rgb(${colorPalletTwo}` }}
                  className="px-2 py-2 inline-flex items-center rounded-lg"
                >
                  <span className={'p-1 text-xl bg-cyan-500 rounded-lg'}>TMDB</span>
                  <span className={'text-xl pl-1'}>{data?.vote_average?.toFixed(1)}</span>
                </div>
                <div
                  style={{ backgroundColor: `rgb(${colorPalletTwo}` }}
                  className="px-2 py-2 inline-flex items-center rounded-lg ml-3"
                >
                  <span className={'text-xl'}>{data?.first_air_date}</span>
                  <span className={'text-sm px-1'}>
                    <BiSolidCircle />
                  </span>
                  <span className={'text-xl'}>{data.episode_run_time}</span>
                </div>
              </div>
              <ul className="flex items-center mt-3 ">
                {data?.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className={'text-xl p-2 rounded-lg mr-2 capitalize'}
                    style={{ backgroundColor: `rgb(${colorPalletTwo}` }}
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
  );
}
