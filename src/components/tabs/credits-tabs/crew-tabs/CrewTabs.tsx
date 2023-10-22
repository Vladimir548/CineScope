'use client';
import { Crew } from '@/interface/IMovieId';
import Link from 'next/link';
import NextImage from 'next/image';
import style from '../style.module.css';

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
    <div className={'flex  gap-[10px]  overflow-x-auto'}>
      {resultArray.slice(0, 10).map((crew) => (
        <Link href={`/person/${crew.id}`}>
          <div className={'flex-col w-[100px] '}>
            <NextImage
              className={'rounded-large'}
              src={`https://image.tmdb.org/t/p/w185${crew.profile_path}`}
              alt={crew.name}
              width={100}
              height={100}
            />
            <div className="w-[100px]">
              <h3 className={style.name}>{crew.name}</h3>
              <div className={style.character}>
                {crew.jobs.map((job) => (
                  <div key={job}>{job + ' '}</div>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
