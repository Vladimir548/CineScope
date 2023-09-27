'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  name: string;
  email: string;
}

const initialState: IInitialState = {
  name: '',
  email: '',
};
export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { getUserName } = UserSlice.actions;
