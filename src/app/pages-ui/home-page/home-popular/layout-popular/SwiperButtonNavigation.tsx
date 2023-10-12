'use client';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export default function SwiperButtonNavigation({ swiperRef }: any) {
  return (
    <div className="hidden gap-x-2 md:flex">
      <button
        className={
          'cursor-pointer rounded-full bg-zinc-800 p-2 ease-in-out duration-400 hover:bg-zinc-700'
        }
        onClick={() => swiperRef.current.slidePrev()}
      >
        <MdKeyboardArrowLeft size={28} />
      </button>
      <button
        className={
          'cursor-pointer rounded-full bg-zinc-800 p-2 ease-in-out duration-400 hover:bg-zinc-700'
        }
        onClick={() => swiperRef.current.slideNext()}
      >
        <MdKeyboardArrowRight size={28} />
      </button>
    </div>
  );
}
