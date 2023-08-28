'use client';

import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks/useActions';
import { closeBurger, toggleBurger } from '@/redux/slices/menu-slice';
import style from './style.module.css';

export default function HeaderBurger() {
  const { isActive } = useTypedSelector((state) => state.burger);
  const dispatch = useAppDispatch();
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const currentWindowWidth = window.innerWidth;
      setWindowWidth(currentWindowWidth);

      // Здесь задайте вашу ширину для сравнения
      const yourTargetWidth = 1023;

      // Проверяем, если текущая ширина меньше заданной, вызываем вашу функцию
      if (currentWindowWidth >= yourTargetWidth) {
        dispatch(closeBurger());
      } else {
        return;
      }
    };
    if (typeof window !== 'undefined') {
      handleResize(); // Получаем начальную ширину окна
      window.addEventListener('resize', handleResize); // Добавляем обработчик события resize
    }

    // Очистка обработчика при размонтировании компонента
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <div>
      <div
        onClick={() => dispatch(toggleBurger())}
        className={`${style.burger} ${isActive ? style.active : ''}`}
      >
        <span></span>
      </div>
    </div>
  );
}
