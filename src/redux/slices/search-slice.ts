'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchSlice {
  search: string;
}

const initialState: ISearchSlice = {
  search: '',
};

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchPush(state, action: PayloadAction<string>) {
      state.search = state.search = action.payload;
    },
    clearSearch(state) {
      state.search = state.search = '';
    },
  },
});

export const { searchPush, clearSearch } = SearchSlice.actions;
