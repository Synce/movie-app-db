import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Status } from './enums';

import token from '../../token';
import { RootState } from './store';
import { IDetails } from './interfaces';

interface IDetailsDataSlice {
  cachedDetails: IDetails[];
  status: Status;
}

const initialState: IDetailsDataSlice = {
  status: Status.SUCCESS,
  cachedDetails: [],
};

export const fetchDetails = createAsyncThunk(
  'Details/fetch',
  async (movieId: number, { getState }) => {
    const state = getState() as RootState;

    if (state.detailsData.cachedDetails.find(val => val.id === movieId))
      return null;

    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${token}`,
    );
    return result.data;
  },
);

export const DetailsDataSlice = createSlice({
  name: 'detailsData',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchDetails.pending, state => {
        state.status = Status.LOADING;
      })
      .addCase(fetchDetails.rejected, state => {
        state.status = Status.ERROR;
      })
      .addCase(
        fetchDetails.fulfilled,
        (state, action: PayloadAction<IDetails>) => {
          state.status = Status.SUCCESS;
          if (action.payload) state.cachedDetails.push(action.payload);
        },
      );
  },
});

export const selectDetails =
  (movieId: number) =>
  (state: RootState): IDetails | undefined =>
    state.detailsData.cachedDetails.filter(({ id }) => movieId === id)[0];
export const selectStatus = (state: RootState): Status =>
  state.detailsData.status;

export default DetailsDataSlice.reducer;
