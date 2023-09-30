import { useEffect, useState } from 'react';

export function useCertification(certificate: string) {
  const [isAge, setIsAge] = useState<string>('');
  useEffect(() => {
    switch (certificate) {
      case 'G':
      case 'PG':
      case 'TV-G':
        return setIsAge('0+');
      case 'PG-13':
      case 'TV-PG':
        return setIsAge('12+');
      case 'R':
      case 'TV-14':
        return setIsAge('16+');
      case 'NC-17':
      case 'TV-MA':
        return setIsAge('18+');
    }
  }, [certificate]);
  return isAge;
}
