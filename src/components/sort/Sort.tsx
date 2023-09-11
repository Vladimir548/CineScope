'use client';
import { Select, SelectItem } from '@nextui-org/react';
import { selectData } from '@/data/SelectData';
import { getSort } from '@/redux/slices/sort-slice';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function Sort() {
  const dispatch = useDispatch();
  return (
    <div className="">
      <Select
        items={selectData}
        label={'Cортировать'}
        classNames={{
          base: 'w-[200px]',
        }}
        color={'default'}
        defaultSelectedKeys={['popularity.desc']}
        className="max-w-xs"
        onChange={(e) => dispatch(getSort(e.target.value))}
      >
        {(select) => (
          <SelectItem value={select.value} key={select.value}>
            {select.name}
          </SelectItem>
        )}
      </Select>
    </div>
  );
}
