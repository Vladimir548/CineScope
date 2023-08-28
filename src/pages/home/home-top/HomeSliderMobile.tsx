'use client';

import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { Image } from '@nextui-org/react';
import './slider-styles.css';
import { Autoplay, Navigation } from 'swiper/modules';
import NextImage from 'next/image';
import Link from 'next/link';
import { TrendingResponse } from '@/interface/ITrending';
import style from './style.module.css';
import { cn } from '@/lib/utils';
import { QueryHome } from '@/query/QueryHome';

export default function HomeSliderMobile() {
  const { data } = useQuery(['get-trending-all-mobile'], () => QueryHome.getTrending(), {});

  return (
    <div>
      <Swiper
        className={'mySwiper'}
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
                    isBlurred
                    isZoomed
                    as={NextImage}
                    alt={item.title || item.name}
                    className={cn('object-cover rounded-sm')}
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}original/${item.backdrop_path}`}
                    width={1600}
                    height={700}
                  />

                  <div className={style.item_content_mobile}>
                    <h2 className={style.title}>{item.title ? item.title : item.name}</h2>
                  </div>
                </Link>
              </SwiperSlide>
            ),
        )}
      </Swiper>
    </div>
  );
}
