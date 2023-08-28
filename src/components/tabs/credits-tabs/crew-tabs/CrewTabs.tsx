'use client';
import { Crew } from '@/interface/IMovieId';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import Link from 'next/link';
import NextImage from 'next/image';
import style from '../style.module.css';
import { twMerge } from 'tailwind-merge';

interface ICrew {
  crews: Crew[];
}

export default function CrewTabs({ crews }: ICrew) {
  const res = crews.reduce(
    (
      acc: Record<number, { id: number; profile_path: string; name: string; jobs: string[] }>,
      cur,
    ) => {
      if (!acc[cur.id]) {
        // @ts-ignore
        acc[cur.id] = { id: cur.id, profile_path: cur.profile_path, name: cur.name, jobs: [] };
      }
      acc[cur.id].jobs.push(cur.job);
      return acc;
    },
    [],
  );

  const resultArray = Object.values(res);
  return (
    <div className={'flex flex-wrap gap-[10px] justify-center'}>
      {resultArray.slice(0, 30).map((crew) => (
        <Card
          key={crew.id}
          className=" border-transparent border-2 hover:border-slate-500 hover:border-2 "
        >
          <Link href={`/crew/${crew.id}`}>
            <CardBody className="overflow-visible py-2 flex-none px-1">
              <Image
                as={NextImage}
                alt={crew.name}
                isBlurred
                className={twMerge('object-cover rounded-lg', style.profile)}
                src={`https://image.tmdb.org/t/p/w185${crew.profile_path}`}
                width={185}
                height={280}
                fallbackSrc="https://fakeimg.pl/185x224?text=CineScope&font=bebas"
              />
            </CardBody>
            <CardFooter className={twMerge('pb-2 pt-1  flex-col items-start', style.footer)}>
              <h2 className={twMerge('font-bold', style.name)}>{crew.name}</h2>
              <small className={twMerge('text-default-500 text-sm pt-1', style.job)}>
                {crew.jobs.map((job) => (
                  <span key={job}>{job + ' '}</span>
                ))}
              </small>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
}
