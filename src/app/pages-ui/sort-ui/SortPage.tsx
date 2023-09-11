'use client';
import { QuerySearch } from '@/query/QuerySearch';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import LayoutMulti from '@/layout/LayoutMulti';
import LayoutSkeleton from '@/layout/LayoutSkeleton';
import { openModal } from '@/redux/slices/modal-slices';
import { RiEqualizerFill } from 'react-icons/ri';
import ModalNested from '@/components/modals/ModalNested';
import Placeholder from '@/components/modals/Placeholder';
import { useDispatch } from 'react-redux';
import SearchPopular from '@/app/pages-ui/search-page/SearchPopular';
import { useSearchParams } from 'next/navigation';
import PaginationComponent from '@/components/pagination/PaginationComponent';
import { Select, SelectItem } from '@nextui-org/react';
import { getSort } from '@/redux/slices/sort-slice';
import { selectData } from '@/data/SelectData';
import Sort from '@/components/sort/Sort';

export default function SortPage() {
  const { genre } = useTypedSelector((state) => state.genre);
  const { country } = useTypedSelector((state) => state.country);
  const { type } = useTypedSelector((state) => state.type);
  const { withYear, byYear } = useTypedSelector((state) => state.year);
  const { minRating, maxRating } = useTypedSelector((state) => state.rating);
  const { sort } = useTypedSelector((state) => state.sort);
  const dispatch = useDispatch();
  const [isRefetch, setIsRefetch] = useState(true);
  useEffect(() => {
    setIsRefetch(false);
  }, []);
  const queryClient = useQueryClient();

  const refreshQuery = () => {
    queryClient.invalidateQueries([
      'get-search-sort',
      genre,
      country,
      type,
      minRating,
      maxRating,
      withYear,
      byYear,
      sort,
    ]);
  };
  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';
  const { data, isSuccess, error } = useQuery(
    [
      'get-search-sort',
      pageParams,
      genre,
      country,
      type,
      minRating,
      maxRating,
      withYear,
      byYear,
      sort,
    ],
    () =>
      QuerySearch.getSorting(
        Number(pageParams),
        genre,
        country,
        type,
        minRating,
        maxRating,
        withYear,
        byYear,
        sort,
      ),
  );

  const clickModal = () => {
    dispatch(openModal());
  };

  return (
    <div>
      <div className="mt-2 flex justify-between items-center">
        <div className="">
          <Sort />
        </div>
        <div className="">
          <button
            className={'p-2 bg-[#18181B] rounded-lg ease-in-out duration-400 hover:bg-[#242429]'}
            onClick={clickModal}
          >
            <RiEqualizerFill size={26} />

            <ModalNested refreshQuery={() => refreshQuery()} refetch={() => setIsRefetch(true)}>
              <Placeholder />
            </ModalNested>
          </button>
        </div>
      </div>
      {isRefetch ? (
        <div className="">
          {isSuccess ? (
            <div>
              <LayoutMulti data={data} />
              <PaginationComponent
                total_pages={data?.total_pages}
                pageParams={Number(pageParams)}
                route={'search'}
              />
            </div>
          ) : (
            <LayoutSkeleton />
          )}
        </div>
      ) : (
        <SearchPopular />
      )}
    </div>
  );
}
