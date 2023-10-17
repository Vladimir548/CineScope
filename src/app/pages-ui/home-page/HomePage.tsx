'use client';
import { useEffect, useState } from 'react';
import HomePopular from './home-popular/HomePopular';
import HomeSlider from '@/app/pages-ui/home-page/home-top/HomeSlider';
// import HomeSliderMobile from '@/app/pages-ui/home-page/home-top/HomeSliderMobile';
import dynamic from 'next/dynamic';

const DynamicSlider = dynamic(() => import('@/app/pages-ui/home-page/home-top/HomeSlider'), {});
const DynamicSliderMobile = dynamic(
  () => import('@/app/pages-ui/home-page/home-top/HomeSliderMobile'),
  {},
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
        <div className="">{windowWidth > 545 ? <HomeSlider /> : <DynamicSliderMobile />}</div>
        <div className="mt-10 mb-10">
          <HomePopular />
        </div>
      </>
    </div>
  );
}
