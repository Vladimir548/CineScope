'use client';
import { Card, CardFooter, CardBody, Image } from '@nextui-org/react';
import Link from 'next/link';
import NextImage from 'next/image';
import { twMerge } from 'tailwind-merge';
import style from './style.module.css';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { ActorsResponse } from '@/interface/interface-actor/IActors';

interface ILayoutActors {
  data: ActorsResponse;
  isPage?: number;
}

export default function LayoutActors({ data, isPage }: ILayoutActors) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isPage]);
  return (
    <div className=" overflow-hidden">
      <div className={style.content}>
        {data?.results.map((actor) => (
          <Card
            key={actor.id}
            className=" border-transparent border-2 hover:border-slate-500 hover:border-2 "
          >
            <Link className={style.link} key={actor.id} href={`/person/${actor.id}`}>
              <CardBody className="overflow-visible py-2 flex-none px-1">
                {actor.profile_path ? (
                  <Image
                    isBlurred
                    isZoomed
                    as={NextImage}
                    alt={actor.name}
                    className={cn('object-cover rounded-sm ', style.poster)}
                    src={`https://image.tmdb.org/t/p/w342${actor.profile_path}`}
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
                    alt={actor.name}
                  />
                )}
              </CardBody>
              <CardFooter className={cn('pb-2 pt-1  flex-col items-start', style.cont_titles)}>
                <h2 className={twMerge(' font-bold ', style.title)}>{actor.name}</h2>
                <small className={twMerge('text-default-500', style.subtitle)}>{actor.name}</small>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
