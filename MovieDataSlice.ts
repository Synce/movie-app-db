import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import token from './token';

const initialState = {};

export const fetchSearchData = createAsyncThunk(
  'movieData/fetch',
  async search => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key={${token}}&query=${search}`,
    );
    return response;
  },
);

export const MovieDataSlice = createSlice({
  name: 'movieData',
  initialState,
  reducers: {},

  // extraReducers: builder => {
  // builder
  // .addCase(fetchSearchData.pending, state => {})
  // .addCase(fetchSearchData.fulfilled, (state, action) => {});
  // },
});

// export const {} = MovieDataSlice.actions;

export default MovieDataSlice.reducer;
