'use client';
import { useEffect } from 'react';
import style from '@/layout/style.module.css';
import { Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import NextImage from 'next/image';
import { cn } from '@/lib/utils';
import { twMerge } from 'tailwind-merge';
import { TvResponse } from '@/interface/ITv';

interface ILayoutTv {
  data: TvResponse;
  isPage?: number;
}

export default function LayoutTv({ data, isPage }: ILayoutTv) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isPage]);
  return (
    <div className=" overflow-hidden">
      <div className={style.content}>
        {data?.results.map((tv) => (
          <Card
            key={tv.id}
            className=" border-transparent border-2 hover:border-slate-500 hover:border-2 "
          >
            <Link className={style.link} key={tv.id} href={`/tv/${tv.id}`}>
              <CardHeader className="flex justify-between items-center p-0 px-4 ">
                <h4 className={style.rating}>
                  <span className={style.star}>
                    <AiFillStar />
                  </span>{' '}
                  {tv.vote_average.toFixed(1)}
                </h4>
                <h4 className={style.year}>{tv.first_air_date?.split('-')[0]}</h4>
              </CardHeader>
              <CardBody
                className={twMerge('overflow-visible py-2 flex-none px-1', style.block_img)}
              >
                {tv.poster_path ? (
                  <Image
                    isBlurred
                    isZoomed
                    as={NextImage}
                    alt="Card background"
                    className={cn('object-cover rounded-sm ', style.poster)}
                    src={`https://image.tmdb.org/t/p/w342${tv.poster_path}`}
                    width={290}
                    height={420}
                  />
                ) : (
                  <Image
                    as={NextImage}
                    className="object-cover rounded-xl"
                    src={'https://fakeimg.pl/240x400?text=CineScope&font=bebas'}
                    width={290}
                    height={420}
                    alt={tv.name}
                  />
                )}
              </CardBody>
              <CardFooter className={cn('pb-2 pt-1  flex-col items-start', style.cont_titles)}>
                <h2 className={twMerge(' font-bold ', style.title)}>{tv.name}</h2>
                <small className={twMerge('text-default-500', style.subtitle)}>
                  {tv.original_name}
                </small>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
