'use client';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectType } from '@/redux/slices/type-slice';
import { useTypedSelector } from '@/redux/hooks/useTypedSelector';

export default function PlaceholderType() {
  const { type } = useTypedSelector((state) => state.type);
  const [selected, setSelected] = useState<string>(type);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectType(selected));
  }, [selected]);

  return (
    <div>
      <div className=" gap-3">
        <RadioGroup
          label="Выберите тип сортировки"
          orientation={'horizontal'}
          value={selected}
          onValueChange={setSelected}
        >
          <Radio value="movie">Фильмы</Radio>
          <Radio value="tv">Сериалы</Radio>
        </RadioGroup>
      </div>
    </div>
  );
}
