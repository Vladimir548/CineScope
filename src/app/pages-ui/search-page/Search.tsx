'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { IMulti } from '@/interface/IMulti';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import LayoutMulti from '@/layout/LayoutMulti';
import { useDebounce } from '@/hooks/debounce';
import style from './style.module.css';
import { BsSearch } from 'react-icons/bs';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { clearSearch, searchPush } from '@/redux/slices/search-slice';
import { MdClear } from 'react-icons/md';
import { QuerySearch } from '@/query/QuerySearch';
import LayoutSkeleton from '@/layout/LayoutSkeleton';
import { useRouter, useSearchParams } from 'next/navigation';
import SortPage from '@/app/pages-ui/sort-ui/SortPage';
import PaginationComponent from '@/components/pagination/PaginationComponent';
import Sort from '@/components/sort/Sort';
import SearchPopular from '@/app/pages-ui/search-page/SearchPopular';
import { Kbd } from '@nextui-org/kbd';
import SearchDropdown from '@/components/search-dropdown/SearchDropdown';

export default function Search() {
  const router = useRouter();
  const { search } = useTypedSelector((state) => state.search);
  const { sort } = useTypedSelector((state) => state.sort);
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const [isDropdown, setIsDropdown] = useState(true);
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setValue(e.target.value);
  };

  const debounce = useDebounce(value);
  const encodeValue = value.replace(/ /g, '+');
  const onHandlerSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(searchPush(debounce));
    router.push(`/search?query=${encodeValue}`);
    setIsDropdown(false);
  };
  const handlerKey = (e: any) => {
    e.preventDefault();
    if (e.keyCode === 'ENTER' && search.trim() !== '') {
      dispatch(searchPush(debounce));
      router.push(`/search?query=${encodeValue}`);
      setIsDropdown(false);
    }
  };
  useEffect(() => {
    if (search.length === 0) {
      router.push(`/search`);
    }
  }, [search]);
  const clearInput = (e: any) => {
    e.preventDefault();
    dispatch(clearSearch());
    setValue('');
  };

  const searchParams = useSearchParams();
  const pageParams = searchParams!.get('page') ?? '1';
  const { data, isSuccess } = useQuery(['search-multi', search, pageParams], () =>
    QuerySearch.getSearch(search, Number(pageParams)),
  );

  return (
    <div onClick={() => setIsDropdown(false)} className=" mt-2">
      <form onClick={(e) => e.stopPropagation()} className=" relative flex mx-2">
        <div className="relative w-full ">
          <input
            onKeyUp={(e) => handlerKey(e)}
            className={style.input}
            type="text"
            value={value}
            onChange={changeInput}
            onClick={() => setIsDropdown(true)}
            placeholder="Найти..."
          />
          {isDropdown && debounce.length >= 3 && debounce.trim() !== '' && (
            <div className="">
              <SearchDropdown value={debounce} />
            </div>
          )}
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
          className="px-4 py-3 ml-1 bg-blue-700 rounded-lg ease-in-out duration-300 hover:bg-blue-800 hidden md:block "
        >
          Поиск
        </button>
      </form>

      {isSuccess ? (
        <div className="">
          {search.length >= 2 ? (
            <>
              <LayoutMulti data={data} />
              <PaginationComponent
                total_pages={data?.total_pages}
                pageParams={Number(pageParams)}
                route={'search'}
              />
            </>
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
