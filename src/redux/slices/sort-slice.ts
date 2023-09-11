import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISortSlice {
  sort: string;
}

const initialState: ISortSlice = {
  sort: 'popularity.desc',
};
export const SortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    getSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
  },
});
export const { getSort } = SortSlice.actions;
