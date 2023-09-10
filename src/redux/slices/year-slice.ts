import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  byYear: number;
  withYear: number;
}

const date = new Date();
const nowDate = date.getFullYear();
const initialState: IInitialState = {
  byYear: nowDate,
  withYear: 1970,
};

export const YearSlice = createSlice({
  name: 'year',
  initialState,
  reducers: {
    getWithYear(state, action: PayloadAction<number>) {
      state.withYear = action.payload;
    },
    getByYear(state, action: PayloadAction<number>) {
      state.byYear = action.payload;
    },
    clearYear(state) {
      state.withYear = 1970;
      state.byYear = nowDate;
    },
  },
});

export const { getWithYear, getByYear, clearYear } = YearSlice.actions;
