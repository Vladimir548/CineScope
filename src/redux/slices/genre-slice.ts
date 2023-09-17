'use client';

import { Genre } from '@/interface/IGenres';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  genre: string[];
  genreTv: string[];
}

const initialState: IInitialState = {
  genre: [],
  genreTv: [],
};

export const GenreSLice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    addGenres(state, action: PayloadAction<string>) {
      const genreList = state.genre.some((item) => item === action.payload);
      if (!genreList) {
        state.genre = [...state.genre, action.payload];
      } else {
        state.genre = state.genre.filter((item) => item !== action.payload);
      }
    },
    addGenresTv(state, action: PayloadAction<string>) {
      const genreList = state.genreTv.some((item) => item === action.payload);
      if (!genreList) {
        state.genreTv = [...state.genreTv, action.payload];
      } else {
        state.genreTv = state.genreTv.filter((item) => item !== action.payload);
      }
    },

    clearGenres(state) {
      state.genre = [];
    },
    clearGenresTv(state) {
      state.genreTv = [];
    },
  },
});

export const { addGenres, addGenresTv, clearGenres, clearGenresTv } = GenreSLice.actions;
