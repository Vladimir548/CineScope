'use client';
import { Cast } from '@/interface/IMovieId';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import Link from 'next/link';
import NextImage from 'next/image';
import { twMerge } from 'tailwind-merge';
import style from '../style.module.css';

interface IActing {
  cast: Cast[];
}

export default function ActingTabs({ cast }: IActing) {
  return (
    <div className={'flex flex-wrap gap-[5px] justify-center'}>
      {cast.slice(0, 30).map((acting) => (
        <Card
          key={acting.id}
          className=" border-transparent  border-2 hover:border-slate-500 hover:border-2 "
        >
          <Link key={acting.id} href={`/actor/${acting.id}`}>
            <CardBody className="overflow-visible py-2 flex-none px-1">
              <Image
                as={NextImage}
                isBlurred
                loading={'lazy'}
                alt={acting.name}
                className={twMerge('object-cover rounded-lg', style.profile)}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w185${acting.profile_path}`}
                width={185}
                height={285}
              />
            </CardBody>
            <CardFooter className={twMerge('pb-2 pt-1  flex-col items-start', style.footer)}>
              <h2 className={twMerge(style.name)}>{acting.name}</h2>
              <small className={twMerge('text-default-500 text-sm pt-1', style.character)}>
                {acting.character}
              </small>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
}
