'use client';

import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { Image } from '@nextui-org/react';
import './slider.css';
import 'swiper/css/thumbs';
import { Autoplay, Navigation, Thumbs } from 'swiper/modules';
import NextImage from 'next/image';
import Link from 'next/link';
import GenreName from '@/components/genre/GenreName';
import style from './style.module.css';
import { cn } from '@/lib/utils';
import { QueryHome } from '@/query/QueryHome';
import { useState } from 'react';

import dynamic from 'next/dynamic';

const DynamicHomeThumbs = dynamic(() => import('@/app/pages-ui/home-page/home-top/HomeThumbs'));

export default function HomeSlider() {
  const { data, isSuccess, isLoading } = useQuery(['get-trending-all'], () =>
    QueryHome.getTrending(),
  );
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isActiveIndex, setIsActiveIndex] = useState<any>(0);

  const [isTime, setIsTime] = useState<number>(100);

  return (
    <>
      <div className={'relative'}>
        <Swiper
          className={'mySwiper2'}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[Navigation, Autoplay, Thumbs]}
          slidesPerView={1}
          onActiveIndexChange={(swiper) => {
            setIsActiveIndex(swiper.realIndex);
          }}
          onAutoplayTimeLeft={(_, timeLeft, percentage) => {
            setIsTime(Number((percentage * 100).toFixed(0)));
          }}
        >
          {data?.results?.map(
            (item) =>
              item.backdrop_path && (
                <SwiperSlide className={style.slide} key={`thumbs-${item.id}`}>
                  <div className={style.bg_blur}></div>

                  <Image
                    as={NextImage}
                    alt={item!.title ? item!.title || '' : item!.name || ''}
                    className={cn('object-cover rounded-sm')}
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}original/${item.backdrop_path}`}
                    width={2000}
                    height={700}
                    loading={'eager'}
                    sizes=" 100vw"
                  />

                  <div className={style.item_content}>
                    <h2 className={style.title}>{item.title ? item.title : item.name}</h2>
                    <div className={style.item_info}>
                      <div className="flex items-center flex-wrap my-1 ">
                        <div
                          className={cn(
                            'flex bg-slate-900/60 p-1 rounded-lg items-center',
                            style.rating,
                          )}
                        >
                          <span className={cn('bg-cyan-500 p-1 rounded-lg', style.tmdb)}>TMDB</span>
                          <span className="pl-1">{item.vote_average.toFixed(1)}</span>
                        </div>

                        <span className={cn('bg-slate-900/60 p-1 rounded-lg mx-1 ', style.year)}>
                          {
                            (item.release_date ? item.release_date : item.first_air_date)?.split(
                              '-',
                            )[0]
                          }
                        </span>
                        <span className={cn('my-1', style.genres)}>
                          <GenreName genreId={item.genre_ids} />
                        </span>
                      </div>

                      <div className={cn('text-start', style.overwiev)}>{item.overview}</div>
                    </div>
                    <div className="flex items-center gap-x-10 mt-4">
                      <button className={style.more}>
                        <Link
                          className={cn(
                            'p-4 bg-[#0070f0] ease-in duration-300 rounded-lg hover:bg-[#0054b5]',
                            style.link,
                          )}
                          href={`/${item.media_type}/${item.id}`}
                        >
                          Подробнее
                        </Link>
                      </button>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'absolute top-10 right-10 overflow-hidden z-11',
                      style.block_poster,
                    )}
                  >
                    <Image
                      as={NextImage}
                      alt={item.title ? item.title : item.name}
                      className={cn('object-cover rounded-large', style.poster)}
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w342/${item.poster_path}`}
                      width={340}
                      height={300}
                    />
                  </div>
                </SwiperSlide>
              ),
          )}
        </Swiper>
        <DynamicHomeThumbs
          setThumbsSwiper={setThumbsSwiper}
          data={data!}
          isTime={isTime}
          isActiveIndex={isActiveIndex}
        />
      </div>
    </>
  );
}
