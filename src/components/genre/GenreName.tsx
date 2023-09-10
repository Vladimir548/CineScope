'use client';
import { useQuery } from '@tanstack/react-query';
import { Genre, GenreResponse } from '@/interface/IGenres';
import { QueryFilter } from '@/query/QueryFilter';

interface IGenreName {
  genreId: number[];
}

export const genres: Genre[] = [
  { id: 28, name: 'боевик' },
  { id: 10759, name: 'Боевик и Приключения' },
  { id: 37, name: 'вестерн' },
  { id: 10752, name: 'военный' },
  { id: 10768, name: 'Война и Политика' },
  { id: 9648, name: 'детектив' },
  { id: 10762, name: 'Детский' },
  { id: 99, name: 'документальный' },
  { id: 18, name: 'драма' },
  { id: 36, name: 'история' },
  { id: 35, name: 'комедия' },
  { id: 80, name: 'криминал' },
  { id: 10749, name: 'мелодрама' },
  { id: 10402, name: 'музыка' },
  { id: 16, name: 'мультфильм' },
  { id: 10766, name: 'Мыльная опера' },
  { id: 10763, name: 'Новости' },
  { id: 10765, name: 'НФ и Фэнтези' },
  { id: 12, name: 'приключения' },
  { id: 10764, name: 'Реалити-шоу' },
  { id: 10751, name: 'семейный' },
  { id: 10770, name: 'телевизионный фильм' },
  { id: 10767, name: 'Ток-шоу' },
  { id: 53, name: 'триллер' },
  { id: 27, name: 'ужасы' },
  { id: 878, name: 'фантастика' },
  { id: 14, name: 'фэнтези' },
];

export default function GenreName({ genreId }: IGenreName) {
  const genresName = genreId.map((genreI) => {
    const genre = genres.find((g) => g.id === genreI);
    return genre ? genre.name : '';
  });

  return (
    <div className="flex flex-wrap mt-1">
      {genresName.map((item, i) => (
        <span key={i} className="capitalize bg-slate-900/60 mr-1 mb-1  rounded-lg p-1 ">
          {item}
        </span>
      ))}
    </div>
  );
}
