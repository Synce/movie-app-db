import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IMovie } from './interfaces';
import {
  selectCurrentPage,
  selectMaxPages,
  fetchSearchData,
  setLoadingMore,
  setlectLoadingMore,
} from './MovieDataSlice';
import type { RootState, AppDispatch } from './store';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCustomBackAction = (backAction: () => boolean): void => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [backAction]);
};
// Fetch with infinite scroll
export const useFetchMovies = (
  filteredMovies: IMovie[],
  numOfMovies: number,
): void => {
  const currentPage = useAppSelector(selectCurrentPage);
  const maxPages = useAppSelector(selectMaxPages);
  const loadingMore = useAppSelector(setlectLoadingMore);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      filteredMovies.length < 5 + numOfMovies &&
      currentPage > 0 &&
      currentPage !== maxPages
    ) {
      if (!loadingMore) dispatch(setLoadingMore(true));
      dispatch(fetchSearchData());
    } else dispatch(setLoadingMore(false));
  }, [
    currentPage,
    dispatch,
    filteredMovies.length,
    loadingMore,
    maxPages,
    numOfMovies,
  ]);
};
