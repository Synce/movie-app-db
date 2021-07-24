import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Status } from './enums';
import { IMovie } from './interfaces';
import { RootState } from './store';
import token from './token';

interface IMovieDataSlice {
  status: Status;
  fetchedMovies: IMovie[];
  currentSearch: string;
}

const initialState: IMovieDataSlice = {
  status: Status.SUCCESS,
  fetchedMovies: [],
  currentSearch: '',
};

export const fetchSearchData = createAsyncThunk(
  'movieData/fetch',
  async (_, { getState }) => {
    const state = getState() as RootState;

    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${token}&query=${state.movieData.currentSearch}`,
      );
      return result.data.results;
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const MovieDataSlice = createSlice({
  name: 'movieData',
  initialState,
  reducers: {
    changeCurrentSearch(state, action: PayloadAction<string>) {
      state.currentSearch = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchSearchData.pending, state => {
        state.status = Status.LOADING;
      })
      .addCase(fetchSearchData.rejected, state => {
        state.status = Status.ERROR;
      })
      .addCase(
        fetchSearchData.fulfilled,
        (state, action: PayloadAction<IMovie[]>) => {
          state.status = Status.SUCCESS;
          state.fetchedMovies = action.payload;
        },
      );
  },
});

export const selectMovies = (state: RootState): IMovie[] =>
  state.movieData.fetchedMovies;
export const selectStatus = (state: RootState): Status =>
  state.movieData.status;
export const selectCurrentSearch = (state: RootState): string =>
  state.movieData.currentSearch;

export const { changeCurrentSearch } = MovieDataSlice.actions;

export default MovieDataSlice.reducer;
