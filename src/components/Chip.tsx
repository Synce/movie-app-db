import React from 'react';
import { Text, HStack, Pressable } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface IChip {
  value: string;
  close?: boolean;
  onClose?: () => void;
}
const Chip = ({ value, close, onClose }: IChip): JSX.Element => {
  return (
    <HStack
      alignItems="center"
      px={2}
      py={1}
      space={3}
      rounded={20}
      bg="primary.200"
      shadow={2}
    >
      <Text color="tertiary.100" textAlign="center">
        {value}
      </Text>
      {close && (
        <Pressable onPress={onClose}>
          <FontAwesomeIcon style={{ color: '#06D6A0' }} icon={faTimesCircle} />
        </Pressable>
      )}
    </HStack>
  );
};

export default Chip;
