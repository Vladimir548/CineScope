'use client';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByYear, getWithYear } from '@/redux/slices/year-slice';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';

export default function PlaceholderYear() {
  const date = new Date();
  const nowYear = date.getFullYear();
  const { withYear, byYear } = useTypedSelector((state) => state.year);
  const dispatch = useDispatch();
  const [isNumber, setIsNumber] = useState<number[]>([withYear, byYear]);
  useEffect(() => {
    dispatch(getWithYear(isNumber[0]));
    dispatch(getByYear(isNumber[1]));
  }, [isNumber]);

  return (
    <div>
      От {isNumber[0]} До {isNumber[1]}
      <Slider
        style={{ width: 'auto' }}
        trackStyle={{
          height: '10px',
          backgroundColor: '#6171fa',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        step={1}
        handleStyle={{ backgroundColor: 'blue', width: '15px', height: '15px' }}
        range={true}
        dotStyle={{ height: '7px' }}
        railStyle={{
          backgroundColor: '#41596E',
          height: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        defaultValue={[isNumber[0], isNumber[1]]}
        // @ts-ignore
        onChange={(value: number | number[]) => setIsNumber(value)}
        dots={false}
        min={1970}
        max={nowYear}
      />
    </div>
  );
}
