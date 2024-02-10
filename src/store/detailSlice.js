import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'ae58aaabcaeb9c0923ce98b22dd4b3f7';

export const getMovieDetails = createAsyncThunk(
    'movies/getMovieDetails',
    async ({ type, id }) => {
      let url=`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`;
      const response = await axios.get(url);
      return response.data;
    }
);

const detailSlice = createSlice({
    name: 'movies',
    initialState: {
        movie: null,
        status: 'idle',
        error: null,
      },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getMovieDetails.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getMovieDetails.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.movie = action.payload;
        })
        .addCase(getMovieDetails.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });

  export default detailSlice.reducer;