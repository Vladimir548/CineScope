'use client';
import ModalChildren from '@/components/modals/ModalChildren';
import PlaceholderGenres from '@/components/modals/placeholder-item/PlaceholderGenres';
import PlaceholderCountry from '@/components/modals/placeholder-item/PlaceholderCountry';
import { useDispatch } from 'react-redux';
import { clearGenres } from '@/redux/slices/genre-slice';
import { clearCountry } from '@/redux/slices/country-slice';
import PlaceholderYear from '@/components/modals/placeholder-item/PlaceholderYear';
import PlaceholderRating from '@/components/modals/placeholder-item/PlaceholderRating';
import PlaceholderType from '@/components/modals/placeholder-item/PlaceholderType';

export default function Placeholder() {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="">
        <PlaceholderType />
      </div>
      <ModalChildren name={'Жанры'} key={1} clear={() => dispatch(clearGenres())}>
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
