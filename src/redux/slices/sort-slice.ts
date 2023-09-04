import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISortSlice {
  sortTv: string;
  sortMovie: string;
}

const initialState: ISortSlice = {
  sortTv: '',
  sortMovie: '',
};
export const SortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    getTvSort(state, action: PayloadAction<string>) {
      state.sortTv = action.payload;
    },
  },
});
