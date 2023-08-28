'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { IMulti } from '@/interface/IMulti';
import { useInfiniteQuery } from '@tanstack/react-query';
import LayoutMulti from '@/layout/LayoutMulti';
import { useDebounce } from '@/hooks/debounce';
import style from './style.module.css';
import { BsSearch } from 'react-icons/bs';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { clearSearch, searchPush } from '@/redux/slices/search-slice';
import { MdClear } from 'react-icons/md';
import SearchPopular from '@/pages/search/SearchPopular';
import { QuerySearch } from '@/query/QuerySearch';
import LayoutSkeleton from '@/layout/LayoutSkeleton';

export default function Search() {
  const { search } = useTypedSelector((state) => state.search);
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const debounce = useDebounce(value);
  const onHandlerSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(searchPush(debounce));
  };
  const handlerKey = (e: any) => {
    e.preventDefault();
    if (e.keyCode === 13 && search.trim() !== '') return dispatch(searchPush(debounce));
  };
  const clearInput = (e: any) => {
    e.preventDefault();
    dispatch(clearSearch());
    setValue('');
    console.log('click');
  };

  const {
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery(
    ['search-multi', search],
    ({ pageParam = 1 }) => QuerySearch.getSearch(search, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
    },
  );
  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="mt-[50px]  ">
      <form className=" relative flex">
        <div className="relative w-[100vw] ">
          <input
            onKeyUp={(e) => handlerKey(e)}
            className={style.input}
            type="text"
            value={value}
            onChange={changeInput}
            placeholder="Найти..."
          />
          <span className="absolute top-2/4 left-4 -translate-y-2/4">
            <BsSearch size={22} />
          </span>
          <button
            type={'button'}
            onClick={(e) => clearInput(e)}
            className="absolute top-2/4 right-4 -translate-y-2/4 cursor-pointer hover:text-white/60"
          >
            <MdClear size={22} />
          </button>
        </div>
        <button
          onClick={onHandlerSearch}
          className="px-4 py-3 ml-1 bg-blue-700 rounded-lg ease-in-out duration-300 hover:bg-blue-800 "
        >
          Поиск
        </button>
      </form>
      {isSuccess ? (
        <div className="">
          {search.length >= 2 ? (
            <LayoutMulti
              data={data}
              isFetchingNextPage={isFetchingNextPage}
              isFetching={isFetching}
              isLoading={isLoading}
            />
          ) : (
            <SearchPopular />
          )}
        </div>
      ) : (
        <LayoutSkeleton />
      )}
    </div>
  );
}
