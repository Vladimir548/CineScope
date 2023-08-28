'use client';
import style from './style.module.css';
import React, { useMemo } from 'react';
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { CiCompass1 } from 'react-icons/ci';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
import { useAppDispatch } from '@/redux/hooks/useActions';
import { closeBurger, toggleBurger } from '@/redux/slices/menu-slice';

export default function NavigationMenu() {
  const pathname = usePathname();
  const { isActive } = useTypedSelector((state) => state.burger);
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
  const dispatch = useAppDispatch();
  const handleCloseMenu = () => {
    dispatch(toggleBurger());
    console.log('close');
  };
  return (
    <>
      <div
        onClick={handleCloseMenu}
        className={isActive ? style.bg_blur : style.nonActive_blur}
      ></div>
      <div className={isActive ? style.menu : style.menu_close}>
        <div className={style.content}>
          <div className={style.logo}>CineScope</div>
          <ul>
            {routes.map((route) => (
              <li key={route.id} className={'mb-1'}>
                <Link
                  onClick={handleCloseMenu}
                  className={pathname === route.link ? style.active_link : style.link}
                  href={route.link ? route.link : ''}
                >
                  <span className={style.icon}>
                    <route.icon />
                  </span>{' '}
                  <p className={style.link_name}>{route.name}</p>
                </Link>
                {route.subLink && (
                  <ul className="flex flex-col ml-4">
                    {route.subLink.map((sub) => (
                      <Link
                        onClick={handleCloseMenu}
                        key={sub.id}
                        className={pathname === sub.link ? style.active_sublink : style.sublink}
                        href={sub.link}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
