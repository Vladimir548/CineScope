'use client';

import Sort from '@/components/sort/Sort';
import BtnOpenModal from '@/components/btn-open-modal/BtnOpenModal';
import React from 'react';

export default function TopFilter() {
  return (
    <div className="mt-1 flex justify-between items-center mx-2 z-50 py-1">
      <div className="">
        <Sort />
      </div>
      <div className="">
        <BtnOpenModal />
      </div>
    </div>
  );
}
