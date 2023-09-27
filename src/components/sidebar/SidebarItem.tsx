'use client';
import React, { useRef } from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';
import Image from 'next/image';
import style from './style.module.css';
import { usePathname } from 'next/navigation';

import { BsChevronRight } from 'react-icons/bs';

import { IMainLink, IRoutes, ISubLink } from '@/interface/IRoutes';
import { Tooltip } from '@nextui-org/react';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';

interface IsSidebarItem {
  icon: IconType;
  name: string;
  link: string;
  subLink: ISubLink[];
  mainLink: IMainLink;
}

export const SidebarItem: React.FC<IRoutes> = ({
  icon: Icon,
  name,
  link,
  subLink,
  mainLink,
}: IsSidebarItem) => {
  const pathname = usePathname();
  const findSubLink = () => {
    if (subLink) {
      const path = subLink.find((item) => item.link === pathname);
      return path?.link;
    }
  };
  const subPathname = findSubLink();
  const isActive = pathname === link;
  const { isActive: sidActive } = useTypedSelector((state) => state.sidebar);

  return (
    <div className="w-full">
      <div className={style.full_menu}>
        {subLink ? (
          <ul>
            <li className={style.main_link}>
              <Link href={link}>
                <div className={`${style.link} ${pathname === link ? style.active_link : ''}`}>
                  <span className={style.icon}>
                    <Icon />
                  </span>{' '}
                  <p className={style.link_name}>
                    <h3>{name}</h3>
                  </p>
                  <div className={style.icon_sub}>
                    <span>{subLink ? <BsChevronRight size={26} /> : ''}</span>
                  </div>
                </div>
              </Link>
              <ul className={style.subLink}>
                <div>
                  {subLink.map((sub) => (
                    <li className="cursor-pointer" key={sub.id}>
                      <Link href={sub.link}>
                        <div className={`${style.sub_name} ${isActive ? 'bg-slate-700' : ''}`}>
                          <span>{<sub.icon size={28} />}</span>
                          <div className="flex flex-col ">
                            {sub.name} <p className={style.description}>{sub.description}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </div>
              </ul>
            </li>
          </ul>
        ) : (
          <ul>
            {!sidActive ? (
              <Tooltip showArrow={true} content={name} color="default" placement={'right'}>
                <li className={'flex'}>
                  <Link
                    className={`${style.link} ${isActive ? style.active_link : ''}`}
                    href={link}
                  >
                    <span className={style.icon}>
                      <Icon />
                    </span>{' '}
                    <p className={style.link_name}>{name}</p>
                  </Link>
                </li>
              </Tooltip>
            ) : (
              <li className={'flex'}>
                <Link className={`${style.link} ${isActive ? style.active_link : ''}`} href={link}>
                  <span className={style.icon}>
                    <Icon />
                  </span>{' '}
                  <p className={style.link_name}>{name}</p>
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
