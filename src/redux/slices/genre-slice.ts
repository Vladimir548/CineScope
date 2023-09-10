'use client';

import { Genre } from '@/interface/IGenres';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  genre: Genre[];
}

const initialState: IInitialState = {
  genre: [],
};

export const GenreSLice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    addGenres(state, action: PayloadAction<Genre>) {
      const genreList = state.genre.some((item) => item.id === action.payload.id);
      if (!genreList) {
        state.genre = [...state.genre, action.payload];
      } else {
        state.genre = state.genre.filter((item) => item.id !== action.payload.id);
      }
    },
    removeGenres(state, action: PayloadAction<string>) {
      state.genre = state.genre.filter((item) => item.name !== action.payload);
    },
    clearGenres(state) {
      state.genre = [];
    },
  },
});

export const { addGenres, removeGenres, clearGenres } = GenreSLice.actions;
