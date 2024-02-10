// moviesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'ae58aaabcaeb9c0923ce98b22dd4b3f7';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ type, section }) => {
    let url;
    switch(type) {
      case 'top_rated':
        url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
        break;
      case 'popular':
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
        break;
      case 'trending':
        url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
        break;
      default:
        url = '';
    }
    const response = await axios.get(url);
    return { section, data: response.data.results };
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    topRated: {
      data: [],
      loading: false,
      error: null
    },
    popular: {
      data: [],
      loading: false,
      error: null
    },
    trending: {
      data: [],
      loading: false,
      error: null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        const { section } = action.meta.arg;
        state[section].loading = true;
        state[section].error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const { section, data } = action.payload;
        state[section].loading = false;
        state[section].data = data;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        const { section } = action.meta.arg;
        state[section].loading = false;
        state[section].error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
