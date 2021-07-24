import React from 'react';
import { SmallCloseIcon, Text, HStack, Pressable } from 'native-base';

interface IChip {
  value: string;
  close?: boolean;
  onClose?: () => void;
  icon?: JSX.Element;
}
const Chip = ({ value, close, onClose, icon }: IChip): JSX.Element => {
  return (
    <HStack borderWidth={2} borderColor="primary">
      {icon}
      <Text>{value}</Text>
      {close && (
        <Pressable onPress={onClose}>
          <SmallCloseIcon />
        </Pressable>
      )}
    </HStack>
  );
};

export default Chip;
