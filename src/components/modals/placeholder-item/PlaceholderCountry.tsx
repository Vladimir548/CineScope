'use client';
import { useQuery } from '@tanstack/react-query';
import { QueryFilter } from '@/query/QueryFilter';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
import { addCountry } from '@/redux/slices/country-slice';

export default function PlaceholderCountry() {
  const { data } = useQuery(['get-country'], () => QueryFilter.getCountry());
  const { country: CountryItem } = useTypedSelector((state) => state.country);
  const dispatch = useDispatch();
  return (
    <div>
      <ul className={'overflow-y-auto'}>
        {data?.map((country) => (
          <li
            // @ts-ignore
            onClick={() => dispatch(addCountry(country))}
            className={`p-2 my-1 border-1 border-white ease-in-out duration-400 first-letter:uppercase rounded-lg hover:bg-white/20 
              ${
                CountryItem.some((item) => item.iso_3166_1 === country.iso_3166_1)
                  ? 'bg-white/20 '
                  : ''
              }
              `}
            key={country.iso_3166_1}
          >
            {country.native_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
