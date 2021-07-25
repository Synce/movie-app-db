import React, { useEffect, useState } from 'react';
import {
  Button,
  HStack,
  Icon,
  VStack,
  Box,
  Text,
  Center,
  ScrollView,
  Divider,
} from 'native-base';
import { BackHandler } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../components/SearchBar';

import Chip from '../components/Chip';
import FilterMenu from '../components/FilterMenu';
import { ProfileScreenNavigationProp } from '../app/interfaces';
import {
  useAppSelector,
  useAppDispatch,
  useCustomBackAction,
} from '../app/hooks';
import {
  selectCurrentSearch,
  selectGenres,
  selectFilteredGenres,
  fetchGenres,
  changeCurrentSearch,
  fetchSearchData,
  removeGenre,
  setlectYear,
  setYear,
} from '../app/MovieDataSlice';

import MovieList from '../components/MovieList';

interface ISearchScreen {
  navigation: ProfileScreenNavigationProp;
}

const SearchScreen = ({ navigation }: ISearchScreen): JSX.Element => {
  const recentSearch = useAppSelector(selectCurrentSearch);
  const genres = useAppSelector(selectGenres);
  const filteredGenres = useAppSelector(selectFilteredGenres);
  const year = useAppSelector(setlectYear);

  const dispatch = useAppDispatch();

  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  useCustomBackAction(() => {
    BackHandler.exitApp();
    return true;
  });

  return (
    <VStack bg="primary.100" flex={1}>
      <HStack width="100%" space={5} p={2} paddingBottom={0}>
        <Box flex={1}>
          <SearchBar
            placeholder="Search for movies"
            value={recentSearch}
            onChageText={text => {
              dispatch(changeCurrentSearch(text));
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
                <FontAwesomeIcon style={{ color: '#071422' }} icon={faFilter} />
              }
            />
          }
          h={10}
          borderRadius={20}
          bg="secondary.100"
          _pressed={{ opacity: 0.5 }}
          variant="unstyled"
        >
          <Text color="primary.200"> Filter</Text>
        </Button>
      </HStack>
      <Center w="100%" px={5} py={2}>
        <VStack w="100%" space={2}>
          <ScrollView horizontal>
            <HStack space={1} w="100%">
              {year !== 0 && (
                <Chip
                  close
                  key="year"
                  value={`Year: ${year}`}
                  onClose={() => {
                    dispatch(setYear(0));
                    dispatch(fetchSearchData());
                  }}
                />
              )}
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
          <Divider bg="primary.200" />
          {filtersOpen && <FilterMenu />}
        </VStack>
      </Center>
      <MovieList
        onListElementPress={item => {
          navigation.navigate('Details', {
            movieID: item.id,
            name: item.title,
          });
        }}
      />
    </VStack>
  );
};

export default SearchScreen;
