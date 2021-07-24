import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import token from '../../token';
import { Status } from './enums';
import { IGenre, IMovie } from './interfaces';
import { RootState } from './store';

interface IMovieDataSlice {
  status: Status;
  fetchedMovies: IMovie[];
  currentSearch: string;
  genres: IGenre[];
  filteredGenres: number[];
}

const initialState: IMovieDataSlice = {
  status: Status.SUCCESS,
  fetchedMovies: [],
  currentSearch: '',
  genres: [],
  filteredGenres: [],
};

export const fetchSearchData = createAsyncThunk(
  'movieData/fetch',
  async (_, { getState }) => {
    const state = getState() as RootState;
    if (state.movieData.currentSearch === '') return [];

    const result = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${token}&query=${state.movieData.currentSearch}`,
    );

    return result.data.results;
  },
);
export const fetchGenres = createAsyncThunk('Genres/fetch', async () => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${token}`,
  );
  return result.data.genres;
});

export const MovieDataSlice = createSlice({
  name: 'movieData',
  initialState,
  reducers: {
    changeCurrentSearch(state, action: PayloadAction<string>) {
      state.currentSearch = action.payload;
    },
    addGenre(state, action: PayloadAction<number>) {
      state.filteredGenres.push(action.payload);
    },
    removeGenre(state, action: PayloadAction<number>) {
      const genreIndex = state.filteredGenres.indexOf(action.payload);
      if (genreIndex >= 0) state.filteredGenres.splice(genreIndex, 1);
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
      )
      .addCase(
        fetchGenres.fulfilled,
        (state, action: PayloadAction<IGenre[]>) => {
          state.genres = action.payload;
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
export const selectGenres = (state: RootState): IGenre[] =>
  state.movieData.genres;
export const selectFilteredGenres = (state: RootState): number[] =>
  state.movieData.filteredGenres;

export const { changeCurrentSearch, addGenre, removeGenre } =
  MovieDataSlice.actions;

export default MovieDataSlice.reducer;
