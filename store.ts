import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import MovieDataSlice from './MovieDataSlice';

export const store = configureStore({
  reducer: {
    movieData: MovieDataSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
