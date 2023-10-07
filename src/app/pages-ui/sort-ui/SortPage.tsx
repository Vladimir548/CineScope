'use client';
import { QuerySearch } from '@/query/QuerySearch';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import LayoutSkeleton from '@/layout/LayoutSkeleton';
import { openModal } from '@/redux/slices/modal-slices';
import { RiEqualizerFill } from 'react-icons/ri';
import ModalNested from '@/components/modals/ModalNested';
import Placeholder from '@/components/modals/Placeholder';
import { useDispatch } from 'react-redux';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@nextui-org/react';
import Sort from '@/components/sort/Sort';
import { addGenres, addGenresTv } from '@/redux/slices/genre-slice';
import { addCountry } from '@/redux/slices/country-slice';
import { getMaxRating, getMinRating } from '@/redux/slices/rating-slice';
import { getByYear, getWithYear } from '@/redux/slices/year-slice';
import { useDefinitionType } from '@/hooks/useDefinitionType';
import LayoutDefinition from '@/layout/LayoutDefinition';
import TopFilter from '@/components/top-filter/TopFilter';

export default function SortPage() {
  const { sort } = useTypedSelector((state) => state.sort);
  const definitionType = useDefinitionType();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';

  const genreParams = searchParams!.get('genres') ?? '';
  const countryParams = searchParams!.get('country') ?? '';
  const withYearParams = searchParams!.get('from') ?? '';
  const byYearParams = searchParams!.get('to') ?? '';
  const minRatingParams = searchParams!.get('minRating') ?? '';
  const maxRatingParams = searchParams!.get('maxRating') ?? '';
  const allParams = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    dispatch(definitionType === 'movie' ? addGenres(genreParams) : addGenresTv(genreParams));
    dispatch(addCountry(countryParams));
    dispatch(getMaxRating(Number(maxRatingParams)));
    dispatch(getMinRating(Number(minRatingParams)));
    dispatch(getWithYear(Number(withYearParams)));
    dispatch(getByYear(Number(byYearParams)));
  }, []);
  const [isPage, setIsPage] = useState<number>(1);
  const { data, isSuccess, error } = useQuery(
    [
      'get-search-sort',
      pageParams,
      genreParams,
      countryParams,
      definitionType,
      withYearParams,
      byYearParams,
      minRatingParams,
      maxRatingParams,
      sort,
    ],
    () =>
      QuerySearch.getSorting(
        Number(pageParams),
        genreParams,
        countryParams,
        definitionType,
        minRatingParams,
        maxRatingParams,
        withYearParams,
        byYearParams,
        sort,
      ),
  );

  const clickModal = () => {
    dispatch(openModal());
  };
  const handleNextClick = (numb: number) => {
    setIsPage((prev) => prev + 1);

    allParams.set('page', `${numb}`);
    router.push(`${pathname}?${allParams.toString()}`);
  };
  return (
    <div>
      {/*<div className="mt-2 flex justify-between items-center">*/}
      {/*  <div className="">*/}
      {/*    <Sort />*/}
      {/*  </div>*/}
      {/*  <div className="">*/}
      {/*    <button*/}
      {/*      className={'p-2 bg-[#18181B] rounded-lg ease-in-out duration-400 hover:bg-[#242429]'}*/}
      {/*      onClick={clickModal}*/}
      {/*    >*/}
      {/*      <RiEqualizerFill size={26} />*/}

      {/*      <ModalNested>*/}
      {/*        <Placeholder />*/}
      {/*      </ModalNested>*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <TopFilter />
      <div className="">
        {isSuccess ? (
          <div>
            <LayoutDefinition data={data} />
            <div className="overflow-hidden flex justify-center my-3">
              <Pagination
                size={'lg'}
                total={data.total_pages}
                page={Number(pageParams)}
                onChange={(numb) => handleNextClick(numb)}
              />
            </div>
          </div>
        ) : (
          <LayoutSkeleton />
        )}
      </div>
    </div>
  );
}
