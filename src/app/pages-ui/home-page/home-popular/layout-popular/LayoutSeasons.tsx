'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';
import { Mousewheel, Pagination } from 'swiper/modules';
import { Card, CardBody, Image } from '@nextui-org/react';
import NextImage from 'next/image';
import { ISeasons } from '@/interface/tv/ISeasons';

interface ILayoutSeasons {
  data?: ISeasons;
}

export default function LayoutSeasons({ data }: ILayoutSeasons) {
  return (
    <div className={''}>
      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        autoHeight={true}
        loop
        spaceBetween={10}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper-seasons "
      >
        <CardBody className={'p-0'}>
          {data?.episodes.map((episode) => (
            <SwiperSlide className={''}>
              <Card
                key={episode.id}
                className="border-none  dark:bg-default-100/50 mb-2"
                shadow="sm"
              >
                <CardBody>
                  <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center ">
                    <div className="relative col-span-6 md:col-span-3">
                      <Image
                        as={NextImage}
                        alt={episode.name}
                        className="object-cover"
                        height={185}
                        shadow="md"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}original/${episode?.still_path}`}
                        width={500}
                      />
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-9">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-0">
                          <h2 className="font-bold ">{episode.name}</h2>

                          <span>Серия {episode?.episode_number}</span>

                          <h3 className="text-md text-foreground/80">{episode.air_date}</h3>

                          <p className={'font-normal text-medium overflow-y-auto max-h-[100px]'}>
                            {episode.overview}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </SwiperSlide>
          ))}
        </CardBody>
      </Swiper>
    </div>
  );
}
