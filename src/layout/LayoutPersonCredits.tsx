'use client';

import style from './style.module.css';
import { Card, CardBody, CardFooter, CardHeader, CircularProgress, Image } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import NextImage from 'next/image';
import { InfiniteData } from '@tanstack/query-core';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { IMulti } from '@/interface/IMulti';
import { ActorsCredits } from '@/interface/interface-actor/IActorId';

interface ILayoutActorsCredits {
  data: ActorsCredits;
}

export default function LayoutPersonCredits({ data }: ILayoutActorsCredits) {
  return (
    <>
      <div className={style.content}>
        {data.crew
          .filter((item) => item.id === item.id)
          .map((item) => (
            <Card
              key={item.id}
              className=" border-transparent border-2 hover:border-slate-500 hover:border-2 "
            >
              <Link className={style.link} key={item.id} href={`/${item.media_type}/${item.id}`}>
                {item.media_type !== 'person' && (
                  <CardHeader className="flex justify-between items-center p-0 px-4 ">
                    <h4 className="font-bold text-base flex items-center md:text-xl">
                      <span>
                        <AiFillStar size={22} />
                      </span>{' '}
                      {item.vote_average?.toFixed(1)}
                    </h4>
                    <h4 className="font-bold text-base md:text-xl">
                      {(item.release_date ? item.release_date : item.first_air_date)?.split('-')[0]}
                    </h4>
                  </CardHeader>
                )}
                <CardBody className="overflow-visible py-2 flex-none p-1">
                  {item.poster_path ? (
                    <Image
                      isBlurred
                      isZoomed
                      as={NextImage}
                      alt={item.title ? item.title : item.name}
                      className="object-cover rounded-sm"
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      width={240}
                      height={360}
                    />
                  ) : (
                    <Image
                      as={NextImage}
                      className="object-cover rounded-xl"
                      src={'https://fakeimg.pl/240x400?text=CineScope&font=bebas'}
                      width={240}
                      height={360}
                      alt={item.title}
                    />
                  )}
                </CardBody>
                <CardFooter className="pb-2 pt-2 px-4 flex-col items-start">
                  <h2 className={twMerge(' font-bold ', style.title)}>
                    {item.title ? item.title : item.name}
                  </h2>
                  <small className={twMerge('text-default-500', style.subtitle)}>
                    {item.original_title ? item.original_title : item.original_name}
                  </small>
                </CardFooter>
              </Link>
            </Card>
          ))}
      </div>
    </>
  );
}
