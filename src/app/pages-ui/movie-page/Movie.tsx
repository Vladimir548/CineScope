'use client';
import { useQuery } from '@tanstack/react-query';
import { QueryMovie } from '@/query/QueryMovie';
import LayoutMovie from '@/layout/LayoutMovie';
import LayoutSkeleton from '@/layout/LayoutSkeleton';
import { useSearchParams } from 'next/navigation';
import PaginationComponent from '@/components/pagination/PaginationComponent';

import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/slices/modal-slices';
import ModalNested from '@/components/modals/ModalNested';
import Placeholder from '@/components/modals/Placeholder';

import { RiEqualizerFill } from 'react-icons/ri';
import Sort from '@/components/sort/Sort';
import React from 'react';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
import TopFilter from '@/components/top-filter/TopFilter';
import Link from 'next/link';

export default function Movie() {
  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';
  const { sort } = useTypedSelector((state) => state.sort);
  const { data, error, isSuccess } = useQuery(['get-movie', pageParams, sort], () =>
    QueryMovie.getMovie(Number(pageParams), sort),
  );

  return (
    <>
      <div>
        <div className="">
          <TopFilter />
        </div>
        {isSuccess ? (
          <>
            <LayoutMovie data={data} isPage={Number(pageParams)} />
            <PaginationComponent
              total_pages={data?.total_pages}
              pageParams={Number(pageParams)}
              route={'movie'}
            />
          </>
        ) : (
          <LayoutSkeleton />
        )}
      </div>
    </>
  );
}
