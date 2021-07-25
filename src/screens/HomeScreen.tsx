import React from 'react';
import { Image, Button, Center, Text } from 'native-base';
import image from '../../assets/welcomeImage.jpg';
import { ProfileScreenNavigationProp } from '../app/interfaces';

interface IHomeScreen {
  navigation: ProfileScreenNavigationProp;
}

const HomeScreen = ({ navigation }: IHomeScreen): JSX.Element => {
  return (
    <Center height="100%" bg="primary.100">
      <Image
        height={200}
        rounded="full"
        width={200}
        source={image}
        alt="none"
      />
      <Button
        size="lg"
        variant="unstyled"
        borderColor="secondary.100"
        borderRadius={20}
        borderWidth={4}
        _pressed={{ bg: 'secondary.100' }}
        onPress={() => navigation.navigate('Search')}
      >
        <Text color="white.50"> Get started</Text>
      </Button>
    </Center>
  );
};

export default HomeScreen;
