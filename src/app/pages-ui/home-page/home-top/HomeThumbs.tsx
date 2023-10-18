'use client';
import 'swiper/css';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import NextImage from 'next/image';
import { Progress } from '@nextui-org/react';
import { TrendingResponse } from '@/interface/ITrending';

interface ISwiperThumbs {
  data: TrendingResponse;
  setThumbsSwiper: any;
  isActiveIndex: number;
  isTime: number;
}

export default function HomeThumbs({
  data,
  setThumbsSwiper,
  isTime,
  isActiveIndex,
}: ISwiperThumbs) {
  return (
    <Swiper
      loop={true}
      spaceBetween={20}
      slidesPerView={5}
      slidesPerGroup={2}
      freeMode={true}
      watchSlidesProgress={true}
      modules={[Navigation, Thumbs]}
      onSwiper={setThumbsSwiper}
      navigation={true}
      slidesPerGroupSkip={2}
      breakpoints={{
        1650: {
          slidesPerView: 6,
        },

        1350: {
          slidesPerView: 5,
        },
        1250: {
          slidesPerView: 4,
          slidesPerGroup: 2,
        },
      }}
      className={'mySwiper'}
    >
      {data?.results?.map((item, index) => (
        <SwiperSlide className={'relative cursor-pointer'}>
          <div className={'relative'}>
            <NextImage
              alt={item!.title ? item!.title || '' : item!.name || ''}
              className={`object-cover rounded-lg h-[150px] opacity-80   `}
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w300/${item.backdrop_path}`}
              width={400}
              height={150}
              sizes=" 100vw"
            />

            <div
              className={`${
                isActiveIndex === index
                  ? 'absolute block left-0 top-0 rounded-lg w-full h-full px-2 py-1 bg-black/60 text-md border-4 border-blue-700'
                  : 'hidden '
              }  `}
            >
              {item.title ? item.title : item.name}
              <div className="absolute bottom-0 right-0 z-[90] px-1 py-2  w-full">
                <Progress
                  isStriped
                  aria-label="Loading..."
                  color="primary"
                  value={isTime}
                  className="max-w-md"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
