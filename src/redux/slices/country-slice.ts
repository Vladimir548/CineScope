'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from '@/interface/ICountry';

interface IInitialState {
  country: string[];
}

const initialState: IInitialState = {
  country: [],
};

export const CountrySLice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    addCountry(state, action: PayloadAction<string>) {
      const CountryList = state.country.some((item) => item === action.payload);
      if (!CountryList) {
        state.country = [...state.country, action.payload];
      } else {
        state.country = state.country.filter((item) => item !== action.payload);
      }
    },

    clearCountry(state) {
      state.country = [];
    },
  },
});

export const { addCountry, clearCountry } = CountrySLice.actions;
