import React from 'react';
import { Text, Center, Pressable } from 'native-base';

interface ISwitch {
  values: [string, string];
  first: boolean;
  onChange: () => void;
}

const Switch = ({ values, first, onChange }: ISwitch): JSX.Element => {
  return (
    <Center>
      <Pressable onPress={onChange}>
        <Text> {first ? values[0] : values[1]}</Text>
      </Pressable>
    </Center>
  );
};

export default Switch;
