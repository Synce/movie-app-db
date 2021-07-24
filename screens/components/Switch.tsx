import React from 'react';
import { Text, Center } from 'native-base';

interface ISwitch {
  values: [string, string];
  first: boolean;
}

const Switch = ({ values, first }: ISwitch): JSX.Element => {
  return (
    <Center>
      <Text> {first ? values[0] : values[1]}</Text>
    </Center>
  );
};

export default Switch;
