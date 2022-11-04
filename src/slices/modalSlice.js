import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    id: null,
  },
  reducers: {
    openModal(state, action) {
      state.id = action.payload;
    },
    closeModal(state){
      state.id = null;
    }
  },
});

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;
