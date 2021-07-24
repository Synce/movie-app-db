import React from 'react';
import { SearchIcon, Input } from 'native-base';
import {
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native';

interface ISearchBar {
  value: string;
  onChageText: (text: string) => void;
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  placeholder?: string;
}

const SearchBar = ({
  value,
  placeholder,
  onChageText,
  onEndEditing,
}: ISearchBar): JSX.Element => {
  return (
    <Input
      variant="filled"
      bg="white.100"
      borderRadius={10}
      color="secondary.50"
      h={10}
      w="100%"
      py={1}
      px={2}
      borderColor="secondary.50"
      placeholder={placeholder}
      InputLeftElement={<SearchIcon color="secondary.50" size="sm" />}
      value={value}
      onChangeText={onChageText}
      onEndEditing={onEndEditing}
    />
  );
};

export default SearchBar;
