'use client';

import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Image } from '@nextui-org/react';
import './slider.css';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import NextImage from 'next/image';
import Link from 'next/link';
import style from './style.module.css';
import { cn } from '@/lib/utils';
import { QueryHome } from '@/query/QueryHome';
import GenreName from '@/components/genre/GenreName';

export default function HomeSliderMobile() {
  const { data } = useQuery(['get-trending-all-mobile'], () => QueryHome.getTrending(), {});

  return (
    <div className={'mt-1'}>
      <Swiper
        pagination
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 100,
          modifier: 1,
          scale: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        slidesPerView={1.15}
        spaceBetween={20}
        loop
        centeredSlides={true}
        className="mySwiper4"
      >
        {data?.results?.map(
          (item) =>
            item.backdrop_path && (
              <SwiperSlide
                className={style.slide_mobile}
                key={item.id}
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}w300/${item.backdrop_path})`,
                }}
              >
                <div className={'py-10 px-2 backdrop-blur-[100px]'}>
                  <Link href={`/${item.media_type}/${item.id}`}>
                    <div className={style.bg_blur_mobile}></div>
                    <div className={cn('relative rounded-lg  overflow-hidden  ')}>
                      <Image
                        as={NextImage}
                        alt={item.title || item.name}
                        quality={50}
                        className={cn(
                          'object-cover rounded-lg blur-[10px] brightness-75  ',
                          style.bg_image_mobile,
                        )}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w300/${item.backdrop_path}`}
                        width={780}
                        height={400}
                        sizes=" 100vw"
                      />
                      <div className="absolute top-0 right-0  z-50 w-[40%] h-full ">
                        <NextImage
                          alt={item.title || item.name || ''}
                          className={cn(' object-cover  rounded-r-lg w-full h-full  ')}
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w185/${item.poster_path}`}
                          width={320}
                          height={350}
                          sizes=" 100vw"
                        />
                      </div>
                      <div className={style.item_content_mobile}>
                        <div
                          className={cn(
                            'bg-white rounded-lg p-1 inline-flex items-center  mb-2',
                            style.block_live_nov,
                          )}
                        >
                          <span className={'mr-1 w-[8px] h-[8px] rounded-full bg-red-600'}></span>
                          <p
                            className={cn(
                              'text-red-600 inline-flex text-[12px] font-bold ',
                              style.live_nov,
                            )}
                          >
                            Сейчас смотрят
                          </p>
                        </div>
                        <h2 className={style.title}>{item.title ? item.title : item.name}</h2>
                        <div className="">
                          <span className={cn(' text-[12px] my-1 ', style.genres)}>
                            <GenreName genreId={item.genre_ids} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ),
        )}
      </Swiper>
    </div>
  );
}
