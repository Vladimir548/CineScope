'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import LayoutMulti from '@/layout/LayoutMulti';
import { useEffect } from 'react';
import { QueryHome } from '@/query/QueryHome';
import LayoutSkeleton from '@/layout/LayoutSkeleton';

export default function SearchPopular() {
  const {
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery(['search-multi'], ({ pageParam = 1 }) => QueryHome.getTrending(pageParam), {
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage;
    },
  });
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
    <div>
      {isSuccess ? (
        <LayoutMulti
          data={data}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
        />
      ) : (
        <LayoutSkeleton />
      )}
    </div>
  );
}
