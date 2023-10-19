'use client';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import NextImage from 'next/image';
import './styles.css';
import style from './style.module.css';

import Link from 'next/link';
import { Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react';
import { AiFillStar } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import { cn } from '@/lib/utils';
import { TvResponse } from '@/interface/ITv';
import { useRef } from 'react';
import SwiperButtonNavigation from '@/app/pages-ui/home-page/home-popular/layout-popular/SwiperButtonNavigation';

interface ILayoutPopularTv {
  data?: TvResponse;

  title: string;
}

export default function LayoutPopularTv({ data, title }: ILayoutPopularTv) {
  const swiperRef = useRef<any>(null);
  return (
    <div className="flex flex-col mx-2  ">
      <div className="flex justify-between items-center  mb-1">
        <div className="flex items-center justify-between w-full ">
          <Link href={`/tv/popular`}>
            <h2 className={style.header}>{title}</h2>
          </Link>
          <Link href={`/tv/popular`}>
            <div className="text-[12px] text-blue-500 block md:hidden">Смотреть больше</div>
          </Link>
          <SwiperButtonNavigation swiperRef={swiperRef} />
        </div>
      </div>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={5}
        slidesPerGroupSkip={2}
        breakpoints={{
          1650: {
            slidesPerView: 6,
            slidesPerGroup: 5,
          },
          1230: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          820: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          540: {
            slidesPerView: 3,
            slidesPerGroup: 2,
          },
          280: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
        spaceBetween={10}
        className="mySwiper-popular"
      >
        {data?.results?.map((item) => (
          <SwiperSlide key={item.id}>
            <Card
              key={item.id}
              className=" border-transparent border-2 flex ease-in-out duration-400 hover:bg-[#3F3F46] "
            >
              <Link className="flex flex-col" href={`/tv/${item.id}`}>
                <CardBody className="overflow-visible py-0 px-0 ">
                  <NextImage
                    className="object-cover rounded-t-lg overflow-hidden"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w342${item.poster_path}`}
                    width={360}
                    height={500}
                    alt={item.name}
                  />
                </CardBody>
                <CardFooter className="pb-1 pt-2 px-2 flex flex-col items-start">
                  <h2 className={twMerge('font-bold text-6xl ', style.title)}>{item.name}</h2>
                  <small className={twMerge('text-default-500 ', style.subtitle)}>
                    {item.original_name}
                  </small>
                  <div className="flex justify-between items-center w-full">
                    <span className={cn('font-bold text-large flex items-center', style.rating)}>
                      <span className={style.star}>
                        <AiFillStar />
                      </span>{' '}
                      <span className={'pl-0.5'}> {item.vote_average}</span>
                    </span>
                    <span className={cn('font-bold text-large', style.year)}>
                      {item.first_air_date.split('-')[0]}
                    </span>
                  </div>
                </CardFooter>
              </Link>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
