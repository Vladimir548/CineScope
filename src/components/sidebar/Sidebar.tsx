'use client';
import React, { useMemo, useRef } from 'react';
import style from './style.module.css';
import { usePathname } from 'next/navigation';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineHome,
  AiOutlineSearch,
} from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { Box } from './Box';
import { SidebarItem } from './SidebarItem';
import { CiCompass1 } from 'react-icons/ci';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '@/redux/slices/sidebar-slice';
import { IRoutes } from '@/interface/IRoutes';

export const Sidebar = () => {
  // const dispatch = useAppDispatch()
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

        mainLink: {
          id: 20,
          name: 'Фильмы',
          link: '/movie',
          src: 'https://image.tmdb.org/t/p/w500/n3PDUmM7Scg63LjfpmkOXtdOPoe.jpg',
        },
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
        mainLink: {
          id: 30,
          name: 'Сериалы',
          link: '/tv',
          src: 'https://image.tmdb.org/t/p/w500/emAFaKrAn1mhJ3ZQbM2503a1X2s.jpg',
        },
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
    ],
    [pathname],
  );

  const { isActive } = useTypedSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <div className={style.sidebar}>
      <div className={`${isActive ? style.block : style.block_close}`}>
        <Box className={`${isActive ? style.box : style.box}`}>
          <div className="flex justify-center items-center pt-2">
            <div onClick={() => dispatch(toggleSidebar())} className={style.btn_toggle}>
              <span></span>
            </div>
            {isActive && <p className={style.logo}>СineScope</p>}
          </div>
          <div className={style.routes}>
            {routes.map((item) => (
              // @ts-ignore
              <SidebarItem key={item.id} {...item} />
            ))}
          </div>
        </Box>
      </div>
    </div>
  );
};
