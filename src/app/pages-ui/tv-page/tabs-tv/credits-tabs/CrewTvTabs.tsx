import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { QueryTv } from '@/query/QueryTv';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import Link from 'next/link';
import NextImage from 'next/image';
import { twMerge } from 'tailwind-merge';
import style from './style.module.css';

export default function CrewTvTabs() {
  const params = useParams();
  const { data } = useQuery(['get-credits-crew-tv'], () =>
    QueryTv.getIdTvCredits(Number(params!.id)),
  );

  return (
    <div className={'flex flex-wrap gap-[10px] justify-center'}>
      {data?.crew.slice(0, 30).map((crew) => (
        <Card
          key={crew.id}
          className=" border-transparent border-2 hover:border-slate-500 hover:border-2 "
        >
          <Link href={`/crew/${crew.id}`}>
            <CardBody className="overflow-visible py-2 flex-none px-1">
              <Image
                as={NextImage}
                alt={crew.name}
                className={twMerge('object-cover rounded-lg', style.profile)}
                src={`https://image.tmdb.org/t/p/w185${crew.profile_path}`}
                width={185}
                height={280}
                fallbackSrc="https://fakeimg.pl/185x224?text=CineScope&font=bebas"
              />
            </CardBody>
            <CardFooter className={twMerge('pb-2 pt-1  flex-col items-start', style.footer)}>
              <h2 className={twMerge('font-bold', style.name)}>{crew.name}</h2>
              <small
                className={twMerge(
                  'text-default-500 text-sm pt-1 overflow-y-auto max-h-[100px]',
                  style.job,
                )}
              >
                {crew.jobs.map((job) => (
                  <span key={job.credit_id}>{job.job + ' '}</span>
                ))}
              </small>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
}
