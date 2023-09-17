'use client';
import { Card, Image, Skeleton } from '@nextui-org/react';
import style from './style.module.css';
import NextImage from 'next/image';

export default function LayoutSkeleton() {
  const emptyArr = Array.from({ length: 20 }).map((_, i) => (
    <div>
      <Card key={i} className=" space-y-5 p-4" radius="md">
        <Skeleton className="w-full rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <Image
            as={NextImage}
            className="object-cover rounded-xl"
            src={'https://fakeimg.pl/240x400?text=KinoScope&font=bebas'}
            width={290}
            height={360}
            sizes="(max-width: 330px) 120px,100vw"
            alt={'skeleton'}
          />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className=" rounded-lg w-full">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg w-full">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
    </div>
  ));
  return <div className={style.content}>{emptyArr}</div>;
}
