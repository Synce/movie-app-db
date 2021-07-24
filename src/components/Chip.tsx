import React from 'react';
import { SmallCloseIcon, Text, HStack, Pressable } from 'native-base';

interface IChip {
  value: string;
  close?: boolean;
  onClose?: () => void;
}
const Chip = ({ value, close, onClose }: IChip): JSX.Element => {
  return (
    <HStack
      alignItems="center"
      borderWidth={2}
      px={2}
      space={3}
      rounded={20}
      borderColor="primary"
    >
      <Text justifyContent="center">{value}</Text>
      {close && (
        <Pressable onPress={onClose}>
          <SmallCloseIcon />
        </Pressable>
      )}
    </HStack>
  );
};

export default Chip;
