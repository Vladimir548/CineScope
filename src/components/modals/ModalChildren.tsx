'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './style.module.css';

interface IModalChildren {
  children: React.ReactNode;
  name: string;
  key: number;
  clear: () => void;
}

export default function ModalChildren({ children, name, key, clear }: IModalChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex flex-col">
        <div
          key={key}
          className={
            'p-4 border-1 border-slate-500 my-1 rounded-lg ease-in-out duration-400 hover:bg-slate-500'
          }
          onClick={() => setIsOpen(true)}
        >
          {name}
        </div>
      </div>
      {isOpen && (
        <>
          <div onClick={() => setIsOpen(false)} className={style.modal_children}>
            <div onClick={(e) => e.stopPropagation()} className={style.modal_content_children}>
              <div className={'overflow-y-auto h-full '}>{children}</div>
              <div className=" w-full  flex justify-between gap-1   ">
                <button
                  onClick={() => setIsOpen(false)}
                  className={
                    'w-full py-3 rounded-lg ease-in-out duration-400 bg-[#f0f8ffa8] hover:bg-[#f0f8ff94]'
                  }
                >
                  Закрыть
                </button>
                <button
                  onClick={() => clear()}
                  className={
                    'w-full py-3 rounded-lg ease-in-out duration-400 bg-red-700 hover:bg-red-600'
                  }
                >
                  Очистить
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
