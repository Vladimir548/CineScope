'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
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
import { MoviesResponse } from '@/interface/IMovie';
import { useRef } from 'react';
import SwiperButtonNavigation from '@/app/pages-ui/home-page/home-popular/layout-popular/SwiperButtonNavigation';

interface ILayoutPopularMovie {
  data?: MoviesResponse;
  title: string;
}

export default function LayoutPopularMovie({ data, title }: ILayoutPopularMovie) {
  const swiperRef = useRef<any>(null);
  return (
    <div className="flex flex-col mx-2 ">
      <div className="flex justify-between items-end  mb-1">
        <div className="flex items-start flex-col ">
          <Link href={`/movie/popular`}>
            <h2 className={style.header}>{title}</h2>
          </Link>
          <Link
            className="bg-zinc-700 p-3  rounded-[50px] ease-in duration-300 hover:bg-zinc-800"
            href={`/movie/popular`}
          >
            Посмотреть больше
          </Link>
        </div>
        <SwiperButtonNavigation swiperRef={swiperRef} />
      </div>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={5}
        slidesPerGroupSkip={2}
        breakpoints={{
          1650: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          950: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          600: {
            slidesPerView: 3,
            slidesPerGroup: 3,
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
              className=" border-transparent border-2  flex ease-in-out duration-400 hover:bg-[#3F3F46] "
            >
              <Link className="flex flex-col" href={`/movie/${item.id}`}>
                <CardHeader className="flex justify-between items-center p-0 px-4 ">
                  <h4 className={cn('font-bold text-large flex items-center', style.rating)}>
                    <span>
                      <AiFillStar size={22} />
                    </span>{' '}
                    {item.vote_average}
                  </h4>
                  <h4 className={cn('font-bold text-large', style.year)}>
                    {item.release_date.split('-')[0]}
                  </h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2 ">
                  <NextImage
                    className="object-cover rounded-sm overflow-hidden"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w500${item.poster_path}`}
                    width={360}
                    height={500}
                    alt={item.title}
                  />
                </CardBody>
                <CardFooter className="pb-2 pt-2 px-4 flex flex-col items-start">
                  <h2 className={twMerge('font-bold text-6xl ', style.title)}>{item.title}</h2>
                  <small className={twMerge('text-default-500 ', style.subtitle)}>
                    {item.original_title}
                  </small>
                </CardFooter>
              </Link>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
