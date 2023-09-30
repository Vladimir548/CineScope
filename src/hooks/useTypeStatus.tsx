import { useEffect, useState } from 'react';

export const useTypeStatus = (status: string) => {
  const [isStatus, setIsStatus] = useState<string>('');

  useEffect(() => {
    if (status) {
      switch (status) {
        case 'Ended':
          return setIsStatus('Закончен');

        case 'Canceled':
          return setIsStatus('Закрыт');

        case 'Returning Series':
          return setIsStatus('В производстве');

        default:
          return setIsStatus('');
      }
    }
  }, [status]);

  return isStatus;
};
