'use client';
import React from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';
import Image from 'next/image';
import style from './style.module.css';
import { usePathname } from 'next/navigation';

import { BsChevronRight } from 'react-icons/bs';

import { IRoutes } from '@/interface/IRoutes';
import { Tooltip } from '@nextui-org/react';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';

export const SidebarItem: React.FC<IRoutes> = ({ icon: Icon, name, link, subLink, mainLink }) => {
  const pathname = usePathname();
  const isActive = pathname === link;
  const { isActive: sidActive } = useTypedSelector((state) => state.sidebar);
  return (
    <div className="w-full">
      <div className={style.full_menu}>
        {subLink ? (
          <ul>
            <li className={style.main_link}>
              <div className={`${style.link} ${isActive ? style.active_link : ''}`}>
                <span className={style.icon}>
                  <Icon />
                </span>{' '}
                <p className={style.link_name}>{name}</p>
              </div>
              <ul className={style.subLink}>
                <div key={mainLink.id}>
                  <Link className="relative cursor-pointer" href={mainLink?.link}>
                    <Image
                      className={'rounded-lg'}
                      src={mainLink.src}
                      alt={mainLink.name}
                      width={220}
                      height={280}
                    />
                    <p
                      className=" absolute left-1/2 bottom-0  -translate-x-1/2
                                        flex justify-center py-2
                                        text-2xl bg-slate-800/50 w-full backdrop-blur "
                    >
                      {mainLink.name}
                    </p>
                  </Link>
                </div>
                <div>
                  {subLink.map((sub) => (
                    <li className="cursor-pointer" key={sub.id}>
                      <Link className={` ${isActive ? '' : ''}`} href={sub.link}>
                        <div className={`${style.sub_name} ${isActive ? 'bg-slate-700' : ''}`}>
                          <span>{<sub.icon size={24} />}</span>
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
              <Tooltip showArrow={true} content={name} color="danger" placement={'right'}>
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
