'use client';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ButtonUp() {
  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  const { scrollY } = useScroll();

  const displayF = useTransform(scrollY, [0, 1200], ['none', 'flex']);
  return (
    <motion.div
      style={{ display: displayF }}
      className={
        'fixed cursor-pointer right-2 bottom-2 p-3 bg-slate-700 rounded-full duration-300 z-40 ease-in-out hover:bg-slate-500'
      }
    >
      <span onClick={handleScrollUp}>
        <AiOutlineArrowUp size={20} />
      </span>
    </motion.div>
  );
}
