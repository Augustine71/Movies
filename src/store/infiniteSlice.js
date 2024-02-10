// infiniteSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'ae58aaabcaeb9c0923ce98b22dd4b3f7';

export const fetchInfiniteMovies = createAsyncThunk(
    'movies/fetchInfiniteMovies',
    async ({ page, type }) => {
      let url=`https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&page=${page}`;
      const response = await axios.get(url);
      console.log(response.data.results);
      return { type, data:response.data };
    }
);

const infiniteSlice = createSlice({
  name: 'movies',
  initialState: {
    movie: {
      data: [],
      page: 1,
      status: 'idle',
      error: null,
    },
    tv: {
      data: [],
      page: 1,
      status: 'idle',
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfiniteMovies.pending, (state,action) => {
        const { type } = action.meta.arg;
        state[type].status = 'loading';
        state[type].error = null;
      })
      .addCase(fetchInfiniteMovies.fulfilled, (state, action) => {
        const { type, data } = action.payload;
        state[type].data = state[type].page === 1 ? data.results : [...state[type].data, ...data.results];
        state[type].status = 'succeeded';
        state[type].page++;
      })
      .addCase(fetchInfiniteMovies.rejected, (state, action) => {
        const { type } = action.meta.arg;
        state[type].loading = 'failed';
        state[type].error = action.error.message;
      });
  },
});

export default infiniteSlice.reducer;
