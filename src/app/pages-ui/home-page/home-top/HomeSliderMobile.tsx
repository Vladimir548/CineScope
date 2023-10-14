'use client';

import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { Image } from '@nextui-org/react';
import './slider.css';
import { Autoplay, Navigation } from 'swiper/modules';
import NextImage from 'next/image';
import Link from 'next/link';
import style from './style.module.css';
import { cn } from '@/lib/utils';
import { QueryHome } from '@/query/QueryHome';
import GenreName from '@/components/genre/GenreName';

export default function HomeSliderMobile() {
  const { data } = useQuery(['get-trending-all-mobile'], () => QueryHome.getTrending(), {});

  return (
    <div>
      <Swiper
        className={'mySwiper-mobile'}
        navigation={false}
        spaceBetween={30}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[Navigation, Autoplay]}
        loop={true}
        slidesPerView={1}
      >
        {data?.results?.map(
          (item) =>
            item.backdrop_path && (
              <SwiperSlide className={style.slide} key={item.id}>
                <Link href={`/${item.media_type}/${item.id}`}>
                  <div className={style.bg_blur}></div>
                  <Image
                    as={NextImage}
                    alt={item.title || item.name}
                    className={cn('object-cover rounded-sm ')}
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w780/${item.backdrop_path}`}
                    width={780}
                    height={400}
                    sizes=" 100vw"
                  />

                  <div className={style.item_content_mobile}>
                    <h2 className={style.title}>{item.title ? item.title : item.name}</h2>
                    <div className=" ">
                      <div className={'flex items-center'}>
                        <div
                          className={cn(
                            'flex bg-slate-900/60 p-1 rounded-lg items-center',
                            style.rating,
                          )}
                        >
                          <span className={cn('bg-cyan-500 p-1 rounded-lg text-sm', style.tmdb)}>
                            TMDb
                          </span>
                          <span className="pl-1">{item.vote_average.toFixed(1)}</span>
                        </div>
                        <span
                          className={cn('bg-slate-900/60 p-1 rounded-lg mx-1 text-sm', style.year)}
                        >
                          {
                            (item.release_date ? item.release_date : item.first_air_date)?.split(
                              '-',
                            )[0]
                          }
                        </span>
                      </div>
                      <span className={cn(' text-sm my-1 ', style.genres)}>
                        <GenreName genreId={item.genre_ids} />
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ),
        )}
      </Swiper>
    </div>
  );
}
