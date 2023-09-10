'use client';
import { createSlice } from '@reduxjs/toolkit';

interface IModal {
  isModal: boolean;
  isModalChildren: boolean;
}

const initialState: IModal = {
  isModal: false,
  isModalChildren: false,
};

export const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state) {
      state.isModal = !state.isModal;
    },
    openModalChildren(state) {
      state.isModalChildren = !state.isModalChildren;
    },
    closeModal(state) {
      state.isModal = false;
    },
  },
});
export const { openModal, closeModal, openModalChildren } = ModalSlice.actions;
