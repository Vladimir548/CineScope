'use client';

import style from './style.module.css';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/slices/modal-slices';
import { useState } from 'react';
import ModalChildren from '@/components/modals/ModalChildren';
import Placeholder from '@/components/modals/Placeholder';
import Link from 'next/link';

interface IModal {
  children?: React.ReactNode;
  refetch: () => void;
  refreshQuery: () => void;
}

export default function ModalNested({ children, refetch, refreshQuery }: IModal) {
  const { isModal } = useTypedSelector((state) => state.modal);

  const dispatch = useDispatch();
  const handleApply = () => {
    dispatch(openModal());
    refetch();
    refreshQuery();
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
                <div
                  onClick={handleApply}
                  className={
                    'w-full bg-blue-800 py-3 ease-in-out duration-400 rounded-lg hover:bg-blue-700'
                  }
                >
                  Применить
                </div>
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
