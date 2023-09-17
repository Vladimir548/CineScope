'use client';

import { openModal } from '@/redux/slices/modal-slices';
import { useDispatch } from 'react-redux';
import { RiEqualizerFill } from 'react-icons/ri';
import ModalNested from '@/components/modals/ModalNested';
import Placeholder from '@/components/modals/Placeholder';
import React from 'react';

export default function BtnOpenModal() {
  const dispatch = useDispatch();
  const clickModal = () => {
    dispatch(openModal());
  };
  return (
    <div>
      <div className="">
        <button
          className={'p-2 bg-[#18181B] rounded-lg ease-in-out duration-400 hover:bg-[#242429]'}
          onClick={clickModal}
        >
          <RiEqualizerFill size={26} />

          <ModalNested>
            <Placeholder />
          </ModalNested>
        </button>
      </div>
    </div>
  );
}
