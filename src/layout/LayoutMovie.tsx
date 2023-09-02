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

interface ILayoutMovie {
  data: MoviesResponse;
  isPage?: number;
}

export default function LayoutMovie({ data, isPage }: ILayoutMovie) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isPage]);
  return (
    <div className=" overflow-hidden">
      <div className={style.content}>
        {data?.results.map((movie) => (
          <Card
            key={movie.id}
            className=" border-transparent border-2 hover:border-slate-500 hover:border-2 "
          >
            <Link className={style.link} key={movie.id} href={`/movie/${movie.id}`}>
              <CardHeader className="flex justify-between items-center p-0 px-4 ">
                <h4 className={style.rating}>
                  <span className={style.star}>
                    <AiFillStar />
                  </span>{' '}
                  {movie.vote_average}
                </h4>
                <h4 className={style.year}>{movie.release_date.split('-')[0]}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2 relative flex-none px-1">
                <NextImage
                  alt={movie.title}
                  className={cn('object-cover rounded-sm ', style.poster)}
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  priority
                  width={290}
                  height={360}
                  sizes="(max-width: 330px) 120px,100vw"
                />
              </CardBody>
              <CardFooter className={cn('pb-2 pt-1  flex-col items-start', style.cont_titles)}>
                <h2 className={twMerge(' font-bold ', style.title)}>{movie.title}</h2>
                <small className={twMerge('text-default-500', style.subtitle)}>
                  {movie.original_title}
                </small>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
