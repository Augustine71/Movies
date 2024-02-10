import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice'
import infiniteReducer from './infiniteSlice'
import detailReducer from './detailSlice'
import listReducer from './listSlice'
 
export const store = configureStore({
  reducer: {
    movies: movieReducer,
    infinite:infiniteReducer,
    detail:detailReducer,
    list:listReducer
  },
});