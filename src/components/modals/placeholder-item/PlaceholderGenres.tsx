'use client';

import { useDispatch } from 'react-redux';
import { addGenres, addGenresTv } from '@/redux/slices/genre-slice';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
import { useQuery } from '@tanstack/react-query';
import { QueryFilter } from '@/query/QueryFilter';
import { useDefinitionType } from '@/hooks/useDefinitionType';

export default function PlaceholderGenres() {
  const definitionType = useDefinitionType();
  const { data, isLoading } = useQuery(['get-genres', definitionType], () =>
    QueryFilter.getGenre(definitionType),
  );

  const { genre: GenreItem, genreTv } = useTypedSelector((state) => state.genre);
  const dispatch = useDispatch();

  return (
    <div>
      <ul className={'max-h-full'}>
        {data?.genres.map((genre) => (
          <li
            onClick={() =>
              definitionType === 'movie'
                ? dispatch(addGenres(String(genre.id)))
                : dispatch(addGenresTv(String(genre.id)))
            }
            className={`p-2 my-1 border-1 border-white ease-in-out duration-400 first-letter:uppercase rounded-lg hover:bg-white/20 
              ${
                definitionType === 'movie'
                  ? GenreItem.some((item) => item === String(genre.id))
                    ? 'bg-white/20 '
                    : ''
                  : genreTv.some((item) => item === String(genre.id))
                  ? 'bg-white/20 '
                  : ''
              }
              `}
            key={genre.id}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
