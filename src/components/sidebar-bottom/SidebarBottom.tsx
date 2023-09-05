'use client';
import style from './style.module.css';
import { useMemo } from 'react';
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { CiCompass1 } from 'react-icons/ci';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import { BsPeople } from 'react-icons/bs';
import { usePathname } from 'next/navigation';
import SidebarItemBottom from '@/components/sidebar-bottom/SidebarItemBottom';

export default function SidebarBottom() {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        id: 1,
        icon: AiOutlineHome,
        name: 'Главная',
        link: '/',
      },
      {
        id: 4,
        icon: AiOutlineSearch,
        name: 'Поиск',
        link: '/search',
      },
      {
        id: 2,
        icon: BiMoviePlay,
        name: 'Фильмы',

        subLink: [
          {
            id: 21,
            icon: CiCompass1,
            name: 'Популярное',
            link: '/movie/popular',
            description: 'Свежие хиты с огромной популярностью',
          },
          {
            id: 22,
            icon: CiCompass1,
            name: 'Новинки',
            link: '/movie/news',
            description: 'Свежие выпуски для вашего увлечения',
          },
          {
            id: 23,
            icon: CiCompass1,
            name: 'Рейтинговые',
            link: '/movie/rated',
            description: 'Высокооцененные критиками и зрителями произведения',
          },
        ],
      },
      {
        id: 3,
        icon: HiMiniComputerDesktop,
        name: 'Сериалы',

        subLink: [
          {
            id: 31,
            icon: CiCompass1,
            name: 'Популярное',
            link: '/tv/popular',
            description: 'Свежие хиты с огромной популярностью',
          },
          {
            id: 32,
            icon: CiCompass1,
            name: 'Новинки',
            link: '/tv/news',
            description: 'Свежие выпуски для вашего увлечения',
          },
          {
            id: 33,
            icon: CiCompass1,
            name: 'Рейтинговые',
            link: '/tv/rated',
            description: 'Высокооцененные критиками и зрителями произведения',
          },
        ],
      },
      {
        id: 5,
        icon: BsPeople,
        name: 'Актеры',
        link: '/actors',
      },
    ],
    [pathname],
  );
  return (
    <div className={style.sidebar_bottom}>
      <SidebarItemBottom routes={routes} />
    </div>
  );
}
