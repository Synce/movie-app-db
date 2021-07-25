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
      variant="unstyled"
      bg="primary.200"
      borderRadius={20}
      color="secondary.100"
      h={10}
      w="100%"
      py={1}
      px={2}
      borderColor="secondary.100"
      borderWidth={2}
      placeholder={placeholder}
      InputLeftElement={<SearchIcon ml={2} color="secondary.100" size="sm" />}
      value={value}
      onChangeText={onChageText}
      onEndEditing={onEndEditing}
    />
  );
};

export default SearchBar;
