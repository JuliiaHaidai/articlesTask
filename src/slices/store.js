import { configureStore } from '@reduxjs/toolkit';
import postsReduser from './postsSlice';
import modalSlice from './modalSlice';

export default configureStore({
  reducer: {
    posts: postsReduser,
    modal: modalSlice,
  },
});
