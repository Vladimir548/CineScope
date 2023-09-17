'use client';

import { usePathname } from 'next/navigation';

export const useDefinitionType = () => {
  const pathname = usePathname();
  const typePathname = pathname.startsWith('/movie') ? 'movie' : 'tv';
  return typePathname;
};
