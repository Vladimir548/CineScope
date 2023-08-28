import { useQuery } from '@tanstack/react-query';
import { QueryTv } from '@/query/QueryTv';
import { useParams } from 'next/navigation';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import Link from 'next/link';
import NextImage from 'next/image';
import { twMerge } from 'tailwind-merge';
import style from './style.module.css';

export default function ActingTvTabs() {
  const params = useParams();
  const { data } = useQuery(['get-credits-tv'], () => QueryTv.getIdTvCredits(Number(params!.id)));

  return (
    <div className={'flex flex-wrap gap-[5px] justify-center'}>
      {data?.cast.slice(0, 50).map((acting) => (
        <Card
          key={acting.id}
          className=" border-transparent  border-2 hover:border-slate-500 hover:border-2 "
        >
          <Link key={acting.id} href={`/acting/${acting.id}`}>
            <CardBody className="overflow-visible py-2 flex-none px-1">
              <NextImage
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
              <small
                className={twMerge(
                  'text-default-500 text-sm pt-1 overflow-y-auto h-[100px]',
                  style.character,
                )}
              >
                {acting.roles.map((role) => (
                  <span key={role.credit_id}>{role.character + ' '}</span>
                ))}
              </small>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
}
