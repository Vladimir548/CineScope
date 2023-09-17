'use client';

import style from './style.module.css';
import { Card, CardBody, CardFooter, CardHeader, CircularProgress, Image } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import NextImage from 'next/image';
import { InfiniteData } from '@tanstack/query-core';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { IMulti } from '@/interface/IMulti';
import { useDefinitionType } from '@/hooks/useDefinitionType';

interface ILayoutMulti {
  data?: IMulti;
}

export default function LayoutMulti({ data }: ILayoutMulti) {
  const definitionType = useDefinitionType();
  return (
    <>
      <div className={style.content}>
        {data?.results
          ?.filter((movie) => movie.poster_path !== null)
          .map((item) => (
            <Card
              key={item.id}
              className=" border-transparent border-2 hover:border-slate-500 hover:border-2 "
            >
              <Link className={style.link} key={item.id} href={`/${definitionType}/${item.id}`}>
                {item.media_type !== 'person' && (
                  <CardHeader className="flex justify-between items-center p-0 px-4 ">
                    <h4 className="font-bold text-base flex items-center lg:text-xl">
                      <span>
                        <AiFillStar size={22} />
                      </span>{' '}
                      {item.vote_average?.toFixed(1)}
                    </h4>
                    <h4 className="font-bold text-base lg:text-xl">
                      {(item.release_date ? item.release_date : item.first_air_date)?.split('-')[0]}
                    </h4>
                  </CardHeader>
                )}
                <CardBody className="overflow-visible py-2 flex-none p-1">
                  <NextImage
                    alt={item.title ? item.title || '' : item.name || ''}
                    className="object-cover rounded-sm"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w342${
                      item.media_type === 'person' ? item.profile_path : item.poster_path
                    }`}
                    width={290}
                    height={360}
                  />
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
