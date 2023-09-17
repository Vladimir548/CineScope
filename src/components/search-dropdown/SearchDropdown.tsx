'use client';
import { useQuery } from '@tanstack/react-query';
import { QuerySearch } from '@/query/QuerySearch';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import style from './style.module.css';
import Link from 'next/link';

interface ISearchDropdown {
  value: string;
}

export default function SearchDropdown({ value }: ISearchDropdown) {
  const { data } = useQuery(['get-search-for-dropdown', value], () => QuerySearch.getSearch(value));
  return (
    <>
      <div>
        <div
          className={
            'w-full h-[400px] rounded-lg overflow-y-auto  absolute top-full left-0 bg-[#18181B]/80 backdrop-blur z-50'
          }
        >
          {data?.results.map((item) => (
            <Link href={`/${item.media_type}/${item.id}`} key={item.id} className={style.block}>
              <div className="">
                <Image
                  className={'w-[92px] object-cover'}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w92${
                    item.media_type === 'person' ? item.profile_path : item.poster_path
                  }`}
                  alt={item.title ? item.title || '' : item.name || ''}
                  width={92}
                  height={138}
                />
              </div>
              <div className="pl-1 flex flex-col">
                <h3> {item.title ? item.title : item.name}</h3>
                <div className="flex gap-x-2">
                  <span className={'flex items-center gap-x-1'}>
                    <span>
                      {' '}
                      <AiFillStar />
                    </span>{' '}
                    {item.vote_average?.toFixed(1)}
                  </span>
                  <span>
                    {item.release_date?.split('-')[0]
                      ? item.release_date?.split('-')[0]
                      : item.first_air_date?.split('-')[0]}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
