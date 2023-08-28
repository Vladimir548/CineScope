'use client';
import { Card, CardFooter, CardHeader, CardBody, Image } from '@nextui-org/react';
import Link from 'next/link';
import NextImage from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { MoviesResponse } from '@/interface/IMovie';
import { twMerge } from 'tailwind-merge';
import style from './style.module.css';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { CollectionMovieResponse } from '@/interface/ICollectionMovie';

interface ILayoutCollection {
  data: CollectionMovieResponse;
}

export default function LayoutCollection({ data }: ILayoutCollection) {
  return (
    <div className=" overflow-hidden">
      <div className={style.content}>
        {data?.parts.map((part) => (
          <Card
            key={part.id}
            className=" border-transparent border-2 hover:border-slate-500 hover:border-2 "
          >
            <Link className={style.link} key={part.id} href={`/movie/${part.id}`}>
              <CardHeader className="flex justify-between items-center p-0 px-4 ">
                <h4 className={style.rating}>
                  <span className={style.star}>
                    <AiFillStar />
                  </span>{' '}
                  {part.vote_average.toFixed(1)}
                </h4>
                <h4 className={style.year}>{part.release_date.split('-')[0]}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2 flex-none px-1">
                {part.poster_path ? (
                  <Image
                    isBlurred
                    isZoomed
                    as={NextImage}
                    alt={part.title}
                    className={cn('object-cover rounded-sm ', style.poster)}
                    src={`https://image.tmdb.org/t/p/w342${part.poster_path}`}
                    fallbackSrc={'https://fakeimg.pl/240x224?text=CineScope&font=bebas'}
                    width={240}
                    height={380}
                  />
                ) : (
                  <Image
                    as={NextImage}
                    className="object-cover rounded-xl"
                    src={'https://fakeimg.pl/240x400?text=CineScope&font=bebas'}
                    width={240}
                    height={240}
                    alt={part.title}
                  />
                )}
              </CardBody>
              <CardFooter className={cn('pb-2 pt-1  flex-col items-start', style.cont_titles)}>
                <h2 className={twMerge(' font-bold ', style.title)}>{part.title}</h2>
                <small className={twMerge('text-default-500', style.subtitle)}>
                  {part.original_title}
                </small>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
