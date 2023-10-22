'use client';
import { Cast } from '@/interface/IMovieId';
import Link from 'next/link';
import NextImage from 'next/image';
import style from '../style.module.css';
import { Image } from '@nextui-org/react';

interface IActing {
  cast: Cast[];
}

export default function ActingTabs({ cast }: IActing) {
  return (
    <div className={'flex  gap-[10px]  overflow-x-auto '}>
      {cast?.slice(0, 30).map((acting) => (
        <Link href={`/person/${acting.id}`}>
          <div className={'flex-col w-[100px] '}>
            <Image
              as={NextImage}
              className={'rounded-large'}
              src={`https://image.tmdb.org/t/p/w185${acting.profile_path}`}
              alt={acting.name}
              width={100}
              height={100}
            />

            <div className="w-[100px]">
              <h3 className={style.name}>{acting.name}</h3>
              <h4 className={style.character}>{acting.character}</h4>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
