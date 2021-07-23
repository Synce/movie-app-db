import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { Image, Button, Text, Center } from 'native-base';
import { StackParamList } from '../App';

import image from '../assets/welcomeImage.jpg';

type ProfileScreenNavigationProp = StackNavigationProp<StackParamList>;

interface IHomeScreen {
  navigation: ProfileScreenNavigationProp;
}

const HomeScreen = ({ navigation }: IHomeScreen): JSX.Element => {
  return (
    <Center height="100%" bg="secondary.50">
      <Text fontSize="4xl" color="primary.50">
        Movie Database
      </Text>
      <Image
        height={200}
        rounded="full"
        width={200}
        source={image}
        alt="none"
      />
      <Button
        borderWidth={4}
        size="lg"
        colorScheme="primary"
        variant="outline"
        onPress={() => navigation.navigate('Search')}
      >
        Get started
      </Button>
    </Center>
  );
};

export default HomeScreen;
