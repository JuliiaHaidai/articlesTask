import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getPosts = createAsyncThunk('posts/getPosts', async ({currentPage, limitPosts}) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${currentPage}&_limit=${limitPosts}`
  );
  return await response.json();
});

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts'
  );
  return await response.json();
});

export const editPost = createAsyncThunk('posts/editPost', async ({id, values}) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
    credentials: 'include',
  });
  return await response.json();
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: null,
    allPosts: null,
  },
  extraReducers: {
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.allPosts = action.payload;
    },
    [editPost.fulfilled]: (state, action) => {
      state.allPosts = state.allPosts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    }
  },
});

export default postsSlice.reducer;
