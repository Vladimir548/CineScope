import { Card, CardBody, Image, Skeleton } from '@nextui-org/react';
import NextImage from 'next/image';

export default function LayoutSeasonsSkeleton() {
  const emptyArr = Array.from({ length: 20 }).map((_, i) => (
    <div>
      <Card className="border-none  dark:bg-default-100/50 mb-2" shadow="sm">
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <Skeleton className="rounded-lg">
              <div className="relative col-span-6 md:col-span-3">
                <Image
                  as={NextImage}
                  alt="Album cover"
                  className="object-cover"
                  height={185}
                  shadow="md"
                  src={`https://fakeimg.pl/240x400?text=KinoScope&font=bebas`}
                  width={500}
                />
              </div>
            </Skeleton>
            <div className="flex flex-col col-span-6 md:col-span-9">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <Skeleton className="w-full rounded-lg">
                    <h2 className="font-bold ">Название</h2>
                  </Skeleton>
                  <Skeleton className="w-full rounded-lg">
                    <span className="font-bold ">Серия</span>
                  </Skeleton>
                  <Skeleton className="w-full rounded-lg">
                    <h3 className="text-md text-foreground/80">Год</h3>
                  </Skeleton>
                  <Skeleton className="w-full rounded-lg">
                    <p className={'font-normal overflow-y-auto max-h-[100px]'}>Описание</p>
                  </Skeleton>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  ));
  return <div className="flex w-full flex-col">{emptyArr}</div>;
}
