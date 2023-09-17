'use client';
import { useQuery } from '@tanstack/react-query';
import { QueryTv } from '@/query/QueryTv';
import LayoutSkeleton from '@/layout/LayoutSkeleton';
import LayoutTv from '@/layout/LayoutTv';
import { useSearchParams } from 'next/navigation';
import PaginationComponent from '@/components/pagination/PaginationComponent';
import Link from 'next/link';
import Sort from '@/components/sort/Sort';
import { RiEqualizerFill } from 'react-icons/ri';
import ModalNested from '@/components/modals/ModalNested';
import Placeholder from '@/components/modals/Placeholder';
import React from 'react';
import BtnOpenModal from '@/components/btn-open-modal/BtnOpenModal';
import TopFilter from '@/components/top-filter/TopFilter';

export default function Tv() {
  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';
  const { data, error, isSuccess } = useQuery(['get-tv', pageParams], () =>
    QueryTv.getTv(Number(pageParams)),
  );
  return (
    <>
      <div>
        {isSuccess ? (
          <>
            <TopFilter />
            <LayoutTv data={data} isPage={Number(pageParams)} />
            <PaginationComponent
              total_pages={data?.total_pages}
              pageParams={Number(pageParams)}
              route={'tv'}
            />
          </>
        ) : (
          <LayoutSkeleton />
        )}
      </div>
    </>
  );
}
