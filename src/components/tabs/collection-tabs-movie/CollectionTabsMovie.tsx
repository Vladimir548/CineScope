import { BelongsToCollection } from '@/interface/IMovieId';
import Link from 'next/link';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import NextImage from 'next/image';
import { cn } from '@/lib/utils';
import { twMerge } from 'tailwind-merge';

interface ICollection {
  collections: BelongsToCollection;
}

export default function CollectionTabsMovie({ collections }: ICollection) {
  return (
    <div>
      {collections !== null ? (
        <Card
          key={collections.id}
          className=" border-transparent border-2 hover:border-slate-500 hover:border-2 "
        >
          <Link key={collections.id} href={`/movie/collection/${collections.id}`}>
            <CardBody className="overflow-visible py-2 flex-none px-1">
              {collections?.poster_path ? (
                <Image
                  isBlurred
                  isZoomed
                  as={NextImage}
                  alt={collections.name}
                  className={cn('object-cover rounded-sm ')}
                  src={`https://image.tmdb.org/t/p/w342${collections.poster_path}`}
                  fallbackSrc={'https://fakeimg.pl/270x270?text=CineScope&font=bebas'}
                  width={270}
                  height={270}
                />
              ) : (
                <Image
                  as={NextImage}
                  className="object-cover rounded-xl"
                  src={'https://fakeimg.pl/240x400?text=CineScope&font=bebas'}
                  width={270}
                  height={270}
                  alt={collections.name}
                />
              )}
            </CardBody>
            <CardFooter className={cn('pb-2 pt-1  flex-col items-start')}>
              <h2 className={' font-bold '}>{collections.name}</h2>
            </CardFooter>
          </Link>
        </Card>
      ) : (
        <p>Коллекция не найдена</p>
      )}
    </div>
  );
}
