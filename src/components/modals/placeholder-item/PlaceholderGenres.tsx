'use client';
import { genres } from '@/components/genre/GenreName';
import { useDispatch } from 'react-redux';
import { addGenres } from '@/redux/slices/genre-slice';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';

export default function PlaceholderGenres() {
  const { genre: GenreItem } = useTypedSelector((state) => state.genre);
  const dispatch = useDispatch();

  return (
    <div>
      <ul className={'max-h-full'}>
        {genres.map((genre) => (
          <li
            // @ts-ignore
            onClick={() => dispatch(addGenres(genre))}
            className={`p-2 my-1 border-1 border-white ease-in-out duration-400 first-letter:uppercase rounded-lg hover:bg-white/20 
              ${GenreItem.some((item) => item.id === genre.id) ? 'bg-white/20 ' : ''}
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
