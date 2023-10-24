'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import NextImage from 'next/image';
import './styles.css';
import style from './style.module.css';
import Link from 'next/link';
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import { AiFillStar } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import SwiperButtonNavigation from '@/app/pages-ui/home-page/home-popular/layout-popular/SwiperButtonNavigation';
import { ISimilarMovieResponse } from '@/interface/ISimilarMovie';
import { TvResponse } from '@/interface/ITv';

type ILayoutSwiper = {
  data: ISimilarMovieResponse;
  title: string;
};

export default function LayoutSwiper({ data, title }: ILayoutSwiper) {
  const swiperRef = useRef<any>(null);
  if (data?.results?.length === 0) return '';
  return (
    <div>
      <div className="flex justify-between items-center  mb-1">
        <div className="flex items-center justify-between w-full  ">
          <h3 className={'text-[18px]'}>{title}</h3>
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
            slidesPerGroup: 6,
          },
          1230: {
            slidesPerView: 6,
            slidesPerGroup: 6,
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
        className="mySwiper-id"
      >
        {data?.results?.map((item) => (
          <SwiperSlide key={item?.id}>
            <Card
              key={item?.id}
              className=" border-transparent border-2  flex ease-in-out duration-400 hover:bg-[#3F3F46] "
            >
              <Link className="flex flex-col" href={`/movie/${item?.id}`}>
                <CardBody className="overflow-visible py-0 px-0 ">
                  <NextImage
                    className="object-cover rounded-t-lg overflow-hidden"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w342${item?.poster_path}`}
                    width={360}
                    height={500}
                    alt={item?.hom!}
                  />
                </CardBody>
                <CardFooter className="pb-1 pt-2 px-2 flex flex-col items-start">
                  <h2 className={twMerge('font-bold text-6xl ', style.title)}>{item?.title}</h2>
                  <small className={twMerge('text-default-500 ', style.subtitle)}>
                    {item?.original_title}
                  </small>
                  <div className="flex justify-between items-center w-full">
                    <span className={cn('font-bold text-large flex items-center', style.rating)}>
                      <span className={style.star}>
                        <AiFillStar />
                      </span>{' '}
                      <span className={'pl-0.5'}> {item.vote_average?.toFixed(1)}</span>
                    </span>
                    <span className={cn('font-bold text-large', style.year)}>
                      {item?.release?.split('-')[0]}
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
