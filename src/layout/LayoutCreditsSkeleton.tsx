import { Card, Image, Skeleton } from '@nextui-org/react';
import NextImage from 'next/image';

export default function LayoutCreditsSkeleton() {
  const emptyArr = Array.from({ length: 30 }).map((_, i) => (
    <div>
      <Card className=" space-y-5 p-4" radius="md">
        <Skeleton className="w-full rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <Image
            as={NextImage}
            className="object-cover rounded-xl"
            src={'https://fakeimg.pl/240x400?text=KinoScope&font=bebas'}
            width={240}
            height={360}
            alt={'skeleton'}
          />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className=" rounded-lg w-full">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
    </div>
  ));
  return <div></div>;
}
