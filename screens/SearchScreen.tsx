import React, { useEffect, useState } from 'react';
import {
  Button,
  HStack,
  Icon,
  VStack,
  FlatList,
  Box,
  Center,
  ScrollView,
} from 'native-base';
import { BackHandler, ListRenderItem } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './components/SearchBar';
import { useAppDispatch, useAppSelector, useCustomBackAction } from '../hooks';
import {
  changeCurrentSearch,
  fetchSearchData,
  fetchGenres,
  selectCurrentSearch,
  selectMovies,
  selectStatus,
  selectGenres,
  selectFilteredGenres,
  removeGenre,
} from '../MovieDataSlice';
import MovieCard from './components/MovieCard';
import { IMovie } from '../interfaces';

import Loader from './components/Loader';
import Chip from './components/Chip';
import FilterMenu from './components/FilterMenu';
import Switch from './components/Switch';
import { filterMoviesByGenre } from '../tools';

const renderMovieCard: ListRenderItem<IMovie> = ({ item }) => (
  <MovieCard {...item} />
);

const SearchScreen = (): JSX.Element => {
  const movies = useAppSelector(selectMovies);
  const status = useAppSelector(selectStatus);
  const recentSearch = useAppSelector(selectCurrentSearch);
  const genres = useAppSelector(selectGenres);
  const filteredGenres = useAppSelector(selectFilteredGenres);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<string>(recentSearch);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [genresAND, setGenresAND] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  useCustomBackAction(() => {
    BackHandler.exitApp();
    return true;
  });

  return (
    <VStack flex={1}>
      <HStack width="100%" space={5} p={2}>
        <Box flex={1}>
          <SearchBar
            placeholder="Search for movies"
            value={search}
            onChageText={setSearch}
            onEndEditing={e => {
              dispatch(changeCurrentSearch(e.nativeEvent.text));
              dispatch(fetchSearchData());
            }}
          />
        </Box>
        <Button
          onPress={() => {
            setFiltersOpen(!filtersOpen);
          }}
          startIcon={
            <Icon
              size="2xl"
              as={
                <FontAwesomeIcon style={{ color: '#f5f7ff' }} icon={faFilter} />
              }
            />
          }
          colorScheme="primary"
          variant="solid"
        >
          Genres
        </Button>
      </HStack>
      <Center w="100%" px={5} py={2}>
        <VStack w="100%" space={4}>
          <HStack>
            <ScrollView horizontal>
              <HStack space={1} w="100%">
                {genres
                  .filter(value => filteredGenres.includes(value.id))
                  .map(value => (
                    <Chip
                      close
                      key={value.id}
                      value={value.name}
                      onClose={() => {
                        dispatch(removeGenre(value.id));
                      }}
                    />
                  ))}
              </HStack>
            </ScrollView>
            {filteredGenres.length > 2 && (
              <Switch
                first={genresAND}
                values={['AND', 'OR']}
                onChange={() => setGenresAND(!genresAND)}
              />
            )}
          </HStack>

          {filtersOpen && <FilterMenu />}
        </VStack>
      </Center>
      <Loader
        status={status}
        errorMasage="Something wrong happend..."
        loading="Loading Movies..."
      >
        <FlatList
          p={5}
          flex={1}
          data={filterMoviesByGenre(movies, genresAND, filteredGenres)}
          renderItem={renderMovieCard}
          keyExtractor={(item: IMovie) => `${item.id}`}
        />
      </Loader>
    </VStack>
  );
};

export default SearchScreen;
