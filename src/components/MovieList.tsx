import React, { useMemo, useState } from 'react';
import { Box, FlatList, Spinner } from 'native-base';
import { ListRenderItem } from 'react-native';
import { IMovie } from '../app/interfaces';
import Loader from './Loader';
import { useAppSelector, useFetchMovies } from '../app/hooks';
import {
  selectFetchStatus,
  selectCurrentPage,
  setlectLoadingMore,
  selectMovies,
  selectFilteredGenres,
  selectMaxPages,
} from '../app/MovieDataSlice';
import MovieCard from './MovieCard';
import { filterMoviesByGenre } from '../app/tools';

interface IMovieList {
  onListElementPress: (item: IMovie) => void;
}

const MovieList = ({ onListElementPress }: IMovieList): JSX.Element => {
  const status = useAppSelector(selectFetchStatus);
  const currentPage = useAppSelector(selectCurrentPage);
  const maxPage = useAppSelector(selectMaxPages);
  const loading = useAppSelector(setlectLoadingMore);
  const movies = useAppSelector(selectMovies);
  const filteredGenres = useAppSelector(selectFilteredGenres);

  const [offset, setOffset] = useState<number>(0);

  const filteredMovies = useMemo(
    () => filterMoviesByGenre(movies, filteredGenres),
    [filteredGenres, movies],
  );

  useFetchMovies(filteredMovies, offset);
  const renderMovieCard: ListRenderItem<IMovie> = ({ item }) => (
    <MovieCard {...item} onPress={() => onListElementPress(item)} />
  );

  return (
    <Loader
      status={status}
      errorMasage="Something wrong happend..."
      loading="Loading Movies..."
      enable={currentPage === 0}
    >
      <Box flex={1} p={5} py={0}>
        <FlatList
          flex={1}
          data={filteredMovies}
          renderItem={renderMovieCard}
          keyExtractor={(item: IMovie, index: number) => `${item.id}${index}`}
          onEndReachedThreshold={10}
          onEndReached={() => {
            if (!loading) setOffset(offset + 20);
          }}
          ListFooterComponent={() => {
            if (currentPage > 0 && currentPage !== maxPage)
              return (
                <Spinner color="white.50" accessibilityLabel="Loading more" />
              );
            return null;
          }}
        />
      </Box>
    </Loader>
  );
};

export default MovieList;
