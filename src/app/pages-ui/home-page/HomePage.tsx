'use client';
import { useEffect, useState } from 'react';
import HomePopular from './home-popular/HomePopular';
import dynamic from 'next/dynamic';
import LoadingCircular from '@/components/loading/LoadingCircular';

const DynamicSlider = dynamic(() => import('@/app/pages-ui/home-page/home-top/HomeSlider'), {
  loading: () => <LoadingCircular />,
});
const DynamicSliderMobile = dynamic(
  () => import('@/app/pages-ui/home-page/home-top/HomeSliderMobile'),
  {
    loading: () => <LoadingCircular />,
  },
);
export default function HomePage() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Добавляем обработчик события только после того, как компонент монтируется в браузере
    window.addEventListener('resize', handleResize);

    // Вызываем обработчик сразу, чтобы установить начальное значение
    handleResize();

    // Убираем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <>
        <div className="">{windowWidth > 545 ? <DynamicSlider /> : <DynamicSliderMobile />}</div>
        <div className="mt-6 mb-10">
          <HomePopular />
        </div>
      </>
    </div>
  );
}
