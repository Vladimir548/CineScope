'use client';
import { Pagination } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface IPagination {
  total_pages: number;
  pageParams: number;
  route: string;
}

export default function PaginationComponent({ pageParams, total_pages, route }: IPagination) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <div className="overflow-hidden flex justify-center my-3 ">
        <Pagination
          size={'lg'}
          total={total_pages}
          page={Number(pageParams)}
          onChange={(numb) => {
            router.push(`/${route}/?page=${Number(numb)}`);
          }}
        />
      </div>
    </div>
  );
}
