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
import { state } from 'sucrase/dist/types/parser/traverser/base';

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
  console.log(isRefetch);
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
  const selectItems = [
    {
      id: 1,
      name: 'По популярности',
      value: 'popularity.desc',
    },
    {
      id: 2,
      name: 'По дате выхода',
      value: 'primary_release_date.desc',
    },
    {
      id: 3,
      name: 'По рейтингу',
      value: 'vote_average.desc',
    },
  ];

  return (
    <div>
      <div className="mt-2 flex justify-between items-center">
        <div className="">
          <Select
            label={'Cортировать'}
            classNames={{
              base: 'w-[200px]',
              listboxWrapper: ' bg-[#27272A]',
            }}
            color={'default'}
            defaultSelectedKeys={'popularity.desc'}
            className="max-w-xs"
            onChange={(e) => dispatch(getSort(e.target.value))}
          >
            {selectItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </Select>
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
