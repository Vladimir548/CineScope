'use client';
import Slider from 'rc-slider';
import { useEffect, useState } from 'react';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { getMaxRating, getMinRating } from '@/redux/slices/rating-slice';

export default function PlaceholderRating() {
  const { minRating, maxRating } = useTypedSelector((state) => state.rating);
  const dispatch = useDispatch();
  const [isNumber, setIsNumber] = useState<number[]>([minRating, maxRating]);
  useEffect(() => {
    dispatch(getMinRating(isNumber[0]));
    dispatch(getMaxRating(isNumber[1]));
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
        min={0}
        max={10}
      />
    </div>
  );
}
