import React, { useState } from 'react';
import { FlatList, Text, Pressable, VStack, Box } from 'native-base';
import { ListRenderItem } from 'react-native';
import { IGenre } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addGenre,
  selectFilteredGenres,
  selectGenres,
} from '../../MovieDataSlice';
import SearchBar from './SearchBar';

const FilterMenu = (): JSX.Element => {
  const [genreSearch, setGenreSearch] = useState<string>('');
  const genres = useAppSelector(selectGenres);
  const filteredGenres = useAppSelector(selectFilteredGenres);
  const dispatch = useAppDispatch();
  const renderGenreOtion: ListRenderItem<IGenre> = ({ item }) => (
    <Pressable
      w="100%"
      p={2}
      onPress={() => {
        dispatch(addGenre(item.id));
      }}
    >
      <Box alignItems="center" justifyContent="center">
        <Text
          color="primary.50"
          borderColor="primary.50"
          borderBottomWidth={1}
          fontSize={25}
        >
          {item.name}
        </Text>
      </Box>
    </Pressable>
  );

  return (
    <Box w="100%" rounded={10} p={5} h={400} bg="secondary.50">
      <VStack w="100%" h="100%">
        <SearchBar
          placeholder="Search genres"
          value={genreSearch}
          onChageText={setGenreSearch}
        />
        <FlatList
          flex={1}
          data={genres.filter(
            value =>
              value.name.includes(genreSearch) &&
              !filteredGenres.includes(value.id),
          )}
          renderItem={renderGenreOtion}
          keyExtractor={(item: IGenre) => `${item.id}`}
        />
      </VStack>
    </Box>
  );
};
export default FilterMenu;
