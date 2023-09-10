import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  type: string;
}

const initialState: IInitialState = {
  type: 'movie',
};

export const TypeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    selectType(state, action: PayloadAction<string>) {
      state.type = state.type = action.payload;
    },
  },
});

export const { selectType } = TypeSlice.actions;
