import React, { useState } from 'react';
import { Button, HStack, Icon, VStack, FlatList } from 'native-base';
import { BackHandler, ListRenderItem } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './components/SearchBar';
import { useAppDispatch, useAppSelector, useCustomBackAction } from '../hooks';
import {
  changeCurrentSearch,
  fetchSearchData,
  selectCurrentSearch,
  selectMovies,
  selectStatus,
} from '../MovieDataSlice';
import MovieCard from './components/MovieCard';
import { IMovie } from '../interfaces';

import Loader from './components/Loader';

const renderMovieCard: ListRenderItem<IMovie> = ({ item }) => (
  <MovieCard {...item} />
);

const SearchScreen = (): JSX.Element => {
  const movies = useAppSelector(selectMovies);
  const status = useAppSelector(selectStatus);
  const recentSearch = useAppSelector(selectCurrentSearch);

  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<string>(recentSearch);

  useCustomBackAction(() => {
    BackHandler.exitApp();
    return true;
  });

  return (
    <VStack flex={1}>
      <HStack width="100%" space={5} p={2}>
        <SearchBar
          value={search}
          onChageText={setSearch}
          onEndEditing={e => {
            dispatch(changeCurrentSearch(e.nativeEvent.text));
            dispatch(fetchSearchData());
          }}
        />
        <Button
          startIcon={
            <Icon
              size="2xl"
              as={
                <FontAwesomeIcon style={{ color: '#f5f7ff' }} icon={faFilter} />
              }
            />
          }
          size="md"
          colorScheme="primary"
          variant="solid"
        >
          Filter
        </Button>
      </HStack>
      <Loader
        status={status}
        errorMasage="Something wrong happend..."
        loading="Loading Movies..."
      >
        <FlatList
          p={5}
          flex={1}
          data={movies}
          renderItem={renderMovieCard}
          keyExtractor={(item: IMovie) => `${item.id}`}
        />
      </Loader>
    </VStack>
  );
};

export default SearchScreen;
