'use client';
import { useQuery } from '@tanstack/react-query';
import { GenreResponse } from '@/interface/IGenres';
import { QueryGenres } from '@/query/QueryGenres';

interface IGenreName {
  genreId: number[];
}

export default function GenreName({ genreId }: IGenreName) {
  const { data } = useQuery(['get-genre'], () => QueryGenres.getGenre());
  const genresName = genreId.map((genreI) => {
    const genre = data?.genres.find((g) => g.id === genreI);
    return genre ? genre.name : '';
  });

  return (
    <div className="flex flex-wrap">
      {genresName.map((item, i) => (
        <span key={i} className="capitalize bg-slate-900/60 mx-1 rounded-lg p-1 ">
          {item}
        </span>
      ))}
    </div>
  );
}
