import React from 'react';
import { SearchIcon, Input, Container } from 'native-base';
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
    <Container flex={1}>
      <Input
        variant="filled"
        bg="white.100"
        borderRadius={10}
        color="secondary.50"
        width="100%"
        margin={2}
        py={1}
        px={2}
        borderColor="secondary.50"
        placeholder={placeholder}
        InputLeftElement={<SearchIcon color="secondary.50" size="sm" ml={2} />}
        value={value}
        onChangeText={onChageText}
        onEndEditing={onEndEditing}
      />
    </Container>
  );
};

export default SearchBar;
