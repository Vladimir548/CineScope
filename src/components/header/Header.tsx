'use client';
import HeaderRoute from '@/components/header/HeaderRoute';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
import HeaderBurger from '@/components/header/header-burger/HeaderBurger';

export default function Header() {
  const { isActive } = useTypedSelector((state) => state.sidebar);
  return (
    <div
      className={`fixed top-0 left-0 w-full hidden  bg-slate-700/4 z-30 h-[40px] flex items-center backdrop-blur ease-in-out duration-300 delay-300`}
    >
      <HeaderRoute />
      <HeaderBurger />
    </div>
  );
}
