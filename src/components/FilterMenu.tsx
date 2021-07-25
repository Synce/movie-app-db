import React, { useState } from 'react';
import {
  FlatList,
  Text,
  Pressable,
  VStack,
  Box,
  Center,
  Icon,
  HStack,
} from 'native-base';
import { ListRenderItem } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Picker } from '@react-native-picker/picker';
import SearchBar from './SearchBar';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { IGenre } from '../app/interfaces';
import {
  selectGenres,
  selectFilteredGenres,
  addGenre,
  setlectYear,
  setYear,
  fetchSearchData,
} from '../app/MovieDataSlice';

const FilterMenu = (): JSX.Element => {
  const years = Array.from(Array(124).keys());

  const [genreSearch, setGenreSearch] = useState<string>('');
  const genres = useAppSelector(selectGenres);
  const filteredGenres = useAppSelector(selectFilteredGenres);
  const year = useAppSelector(setlectYear);
  const dispatch = useAppDispatch();

  const renderGenreOtion: ListRenderItem<IGenre> = ({ item }) => (
    <Pressable
      flex={1}
      h={10}
      m={2}
      bg="primary.100"
      borderRadius={10}
      onPress={() => {
        dispatch(addGenre(item.id));
      }}
    >
      <Center flex={1}>
        <Text
          textAlign="center"
          color="secondary.100"
          borderColor="primary.50"
          fontSize={14}
        >
          {item.name}
        </Text>
      </Center>
    </Pressable>
  );

  return (
    <Box w="100%" rounded={10} p={5} h={300} bg="primary.200">
      <VStack w="100%" h="100%">
        <HStack space={2} marginBottom={3}>
          <Box flex={1}>
            <SearchBar
              placeholder="Search genres"
              value={genreSearch}
              onChageText={setGenreSearch}
            />
          </Box>
          <HStack
            h={10}
            w={100}
            borderRadius={20}
            bg="secondary.100"
            alignItems="center"
            p={4}
          >
            <Icon
              size="2xl"
              as={
                <FontAwesomeIcon
                  style={{ color: '#071422' }}
                  icon={faCalendar}
                />
              }
            />

            <Picker
              onValueChange={itemValue => {
                dispatch(setYear(itemValue));
                dispatch(fetchSearchData());
              }}
              mode="dropdown"
              selectedValue={year}
              style={{ width: 100, padding: 0, backgroundColor: 'transparent' }}
            >
              {years.map(value => (
                <Picker.Item
                  style={{ fontSize: 13 }}
                  key={`${1900 + value}`}
                  value={1900 + value}
                  label={`${1900 + value}`}
                />
              ))}
              <Picker.Item
                style={{ fontSize: 13 }}
                key={0}
                value={0}
                label="All"
              />
            </Picker>
          </HStack>
        </HStack>
        <FlatList
          flex={1}
          data={genres.filter(
            value =>
              value.name.includes(genreSearch) &&
              !filteredGenres.includes(value.id),
          )}
          renderItem={renderGenreOtion}
          numColumns={3}
          keyExtractor={(item: IGenre) => `${item.id}`}
        />
      </VStack>
    </Box>
  );
};
export default FilterMenu;
