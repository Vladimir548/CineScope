'use client';

import style from './style.module.css';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/slices/modal-slices';
import { useCallback, useEffect, useState } from 'react';
import ModalChildren from '@/components/modals/ModalChildren';
import Placeholder from '@/components/modals/Placeholder';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDefinitionType } from '@/hooks/useDefinitionType';

interface IModal {
  children?: React.ReactNode;
}

export default function ModalNested({ children }: IModal) {
  const { isModal } = useTypedSelector((state) => state.modal);
  const { genre, genreTv } = useTypedSelector((state) => state.genre);
  const { country } = useTypedSelector((state) => state.country);
  const { withYear, byYear } = useTypedSelector((state) => state.year);
  const { minRating, maxRating } = useTypedSelector((state) => state.rating);
  const definitionType = useDefinitionType();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleApply = () => {
    dispatch(openModal());
    router.push(
      `/${definitionType}/filters?${
        genre ? `genres=${definitionType === 'movie' ? genre : genreTv}` : ''
      }${
        country ? `&country=${country}` : ''
      }&from=${withYear}&to=${byYear}&minRating=${minRating}&maxRating=${maxRating} `,
    );
  };
  return (
    <>
      {isModal && (
        <>
          <div onClick={() => dispatch(openModal)} className={style.modal}>
            <div className="backdrop-blur absolute top-0 left-0 w-full h-full"></div>
            <div onClick={(e) => e.stopPropagation()} className={style.modal_content}>
              {children}
              <div className="flex justify-between w-full gap-1">
                <button
                  onClick={handleApply}
                  className={
                    'w-full bg-blue-800 py-3 ease-in-out duration-400 rounded-lg hover:bg-blue-700'
                  }
                >
                  Применить
                </button>
                <div
                  onClick={() => dispatch(openModal())}
                  className={
                    'w-full bg-[#f0f8ff6b] py-3 ease-in-out duration-400 rounded-lg hover:bg-[#f0f8ff94]'
                  }
                >
                  Закрыть
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
