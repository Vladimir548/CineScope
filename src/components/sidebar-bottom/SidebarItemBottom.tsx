'use client';
import { AiOutlineHome } from 'react-icons/ai';
import { IconType } from 'react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import style from './style.module.css';

interface IRoutesBottom {
  id: number;
  icon: IconType;
  name: string;
  link: string;
}

interface IItemBottom {
  routes: IRoutesBottom[];
}

export default function SidebarItemBottom({ routes }: IItemBottom) {
  const pathname = usePathname();
  return (
    <div className={'flex justify-between w-full gap-x-1'}>
      {routes.map((route) => (
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
      ))}
    </div>
  );
}
