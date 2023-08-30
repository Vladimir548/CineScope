'use client';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function ButtonUp() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  const handleShowBtn = () => {
    const currentPosition = window.scrollY;
    setScrollPosition(currentPosition);

    if (currentPosition > 300) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleShowBtn);
    return () => {
      window.removeEventListener('scroll', handleShowBtn);
    };
  });

  return (
    <>
      <div
        className={`hidden md:block fixed cursor-pointer   p-3 bg-slate-700   rounded-full duration-500  z-40 ease-in-out hover:bg-slate-500
           ${showBtn ? ' right-2 bottom-2' : '-right-1/2 bottom-2 '}
           `}
        onClick={handleScrollUp}
      >
        <span>
          <AiOutlineArrowUp size={20} />
        </span>
      </div>
    </>
  );
}
