'use client';
import { useQuery } from '@tanstack/react-query';
import { QueryMovie } from '@/query/QueryMovie';
import Image from 'next/image';

export default function ImageUi() {
  const { data } = useQuery(['get-image'], () => QueryMovie.getMovie(1));

  return (
    <div className="flex flex-wrap ">
      {data?.results.map((img) => (
        <Image
          className="p-3 gap-x-3 gap-y-3 bg-slate-800"
          key={img.id}
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}w342/${img.poster_path}`}
          alt={img.title}
          width={290}
          height={290}
          sizes="(min-width: 720px) 220px, calc(95.5vw -19px)"
        />
      ))}
    </div>
  );
}
