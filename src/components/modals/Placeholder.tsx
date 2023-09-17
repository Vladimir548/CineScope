'use client';
import ModalChildren from '@/components/modals/ModalChildren';
import PlaceholderGenres from '@/components/modals/placeholder-item/PlaceholderGenres';
import PlaceholderCountry from '@/components/modals/placeholder-item/PlaceholderCountry';
import { useDispatch } from 'react-redux';
import { clearGenres, clearGenresTv } from '@/redux/slices/genre-slice';
import { clearCountry } from '@/redux/slices/country-slice';
import PlaceholderYear from '@/components/modals/placeholder-item/PlaceholderYear';
import PlaceholderRating from '@/components/modals/placeholder-item/PlaceholderRating';
import PlaceholderType from '@/components/modals/placeholder-item/PlaceholderType';
import { useDefinitionType } from '@/hooks/useDefinitionType';

export default function Placeholder() {
  const dispatch = useDispatch();
  const definitionType = useDefinitionType();
  return (
    <div>
      <ModalChildren
        name={'Жанры'}
        key={1}
        clear={() =>
          definitionType === 'movie' ? dispatch(clearGenres()) : dispatch(clearGenresTv())
        }
      >
        <PlaceholderGenres />
      </ModalChildren>{' '}
      <ModalChildren name={'Страны'} key={2} clear={() => dispatch(clearCountry())}>
        <PlaceholderCountry />
      </ModalChildren>
      <div className={'p-4 border-1 border-slate-500 my-1 rounded-lg ease-in-out duration-400 '}>
        <h2>Года</h2>
        <PlaceholderYear />
      </div>
      <div className={'p-4 border-1 border-slate-500 my-1 rounded-lg ease-in-out duration-400'}>
        <h2>Рейтинг</h2>
        <PlaceholderRating />
      </div>
    </div>
  );
}
