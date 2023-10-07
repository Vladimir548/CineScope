'use client';
import { IconType } from 'react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import style from './style.module.css';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface IRoutesBottomSub {
  id: number;
  icon: IconType;
  name: string;
  link: string;
  description?: string;
}

interface IRoutesBottom {
  id: number;
  icon: IconType;
  name: string;
  link?: string;
  linkOpen?: string;
  subLink?: IRoutesBottomSub[];
}

interface IItemBottom {
  routes: IRoutesBottom[];
}

export default function SidebarItemBottom({ routes }: IItemBottom) {
  const pathname = usePathname();

  return (
    <>
      {routes.map((route) => (
        <div className={'flex justify-between w-full gap-x-1'}>
          {route.link ? (
            <Link
              className={`${style.link} ${
                pathname === route.link ? style.active_link : style.not_active
              }`}
              key={route.id}
              href={route.link}
            >
              <span className={style.icon}> {<route.icon size={24} />}</span>
              <p className={style.name}>{route.name}</p>
            </Link>
          ) : (
            <Dropdown
              classNames={{
                base: 'bg-black max-w-full',
              }}
              showArrow
              className={'bg-slate-800  '}
            >
              <DropdownTrigger className="w-full cursor-pointer">
                <Button
                  className={cn(
                    'flex flex-col justify-center items-center w-full bg-transparent h-full text-sm gap-0 min-w-0 px-0',
                    pathname.startsWith(route?.linkOpen!) ? style.active_link : '',
                  )}
                >
                  <span className={style.icon}> {<route.icon size={24} />}</span>
                  <p className={style.name}> {route.name}</p>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {route?.subLink!.map((sub) => (
                  <DropdownItem
                    textValue={sub.name}
                    className={pathname === sub.link ? style.sub_name_active : style.sub_name}
                    key={sub.id}
                    description={<p className={'text-[11px]'}>{sub.description}</p>}
                  >
                    <Link href={sub.link}>
                      <div className={'flex items-center'}>
                        <span className={style.icon}>{<sub.icon size={22} />}</span>
                        <div className="flex flex-col  flex-wrap">
                          <p>{sub.name}</p>
                        </div>
                      </div>
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      ))}
    </>
  );
}
