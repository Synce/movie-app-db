import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import token from '../../token';
import { Status } from './enums';
import {
  IGenre,
  IMovie,
  ISerchResponse,
  ISerchResponseWithQueryAndYear,
} from './interfaces';
import { RootState } from './store';

interface IMovieDataSlice {
  fetchStatus: Status;
  fetchedMovies: IMovie[];
  currentSearch: string;
  genres: IGenre[];
  filteredGenres: number[];
  currentPage: number;
  maxPages: number;
  loadingMore: boolean;
  selectedYear: number;
}

const initialState: IMovieDataSlice = {
  fetchStatus: Status.SUCCESS,
  fetchedMovies: [],
  currentSearch: '',
  genres: [],
  filteredGenres: [],
  currentPage: 0,
  maxPages: -1,
  loadingMore: false,
  selectedYear: 0,
};

export const fetchSearchData =
  createAsyncThunk<ISerchResponseWithQueryAndYear | null>(
    'movieData/fetch',
    async (_, { getState }): Promise<ISerchResponseWithQueryAndYear | null> => {
      const state = getState() as RootState;
      const { currentSearch, currentPage, maxPages, selectedYear } =
        state.movieData;
      if (currentSearch === '') return null;
      if (maxPages >= 0 && currentPage === maxPages) return null;
      let additionalParams = '';
      if (selectedYear !== 0) additionalParams = `&year=${selectedYear}`;
      const result = await axios.get<ISerchResponse>(
        `https://api.themoviedb.org/3/search/movie?api_key=${token}&query=${currentSearch}&page=${
          currentPage + 1
        }${additionalParams}`,
      );

      return { ...result.data, query: currentSearch, year: selectedYear };
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
      state.currentPage = 0;
      state.maxPages = -1;
      state.fetchedMovies = [];
    },
    addGenre(state, action: PayloadAction<number>) {
      state.filteredGenres.push(action.payload);
    },
    removeGenre(state, action: PayloadAction<number>) {
      const genreIndex = state.filteredGenres.indexOf(action.payload);
      if (genreIndex >= 0) state.filteredGenres.splice(genreIndex, 1);
    },
    setLoadingMore(state, action: PayloadAction<boolean>) {
      state.loadingMore = action.payload;
    },
    setYear(state, action: PayloadAction<number>) {
      state.selectedYear = action.payload;
      state.currentPage = 0;
      state.maxPages = -1;
      state.fetchedMovies = [];
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchSearchData.pending, state => {
        state.fetchStatus = Status.LOADING;
      })
      .addCase(fetchSearchData.rejected, state => {
        state.fetchStatus = Status.ERROR;
      })
      .addCase(
        fetchSearchData.fulfilled,
        (
          state,
          action: PayloadAction<ISerchResponseWithQueryAndYear | null>,
        ) => {
          state.fetchStatus = Status.SUCCESS;
          if (
            action.payload &&
            action.payload.query === state.currentSearch &&
            action.payload.page > state.currentPage &&
            action.payload.year === state.selectedYear
          ) {
            state.fetchedMovies = [
              ...state.fetchedMovies,
              ...action.payload.results,
            ];
            state.maxPages = action.payload.total_pages;
            state.currentPage = action.payload.page;
          }
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
export const selectFetchStatus = (state: RootState): Status =>
  state.movieData.fetchStatus;
export const selectCurrentSearch = (state: RootState): string =>
  state.movieData.currentSearch;
export const selectGenres = (state: RootState): IGenre[] =>
  state.movieData.genres;
export const selectFilteredGenres = (state: RootState): number[] =>
  state.movieData.filteredGenres;
export const selectCurrentPage = (state: RootState): number =>
  state.movieData.currentPage;
export const selectMaxPages = (state: RootState): number =>
  state.movieData.maxPages;
export const setlectLoadingMore = (state: RootState): boolean =>
  state.movieData.loadingMore;
export const setlectYear = (state: RootState): number =>
  state.movieData.selectedYear;

export const {
  changeCurrentSearch,
  addGenre,
  removeGenre,
  setLoadingMore,
  setYear,
} = MovieDataSlice.actions;

export default MovieDataSlice.reducer;
