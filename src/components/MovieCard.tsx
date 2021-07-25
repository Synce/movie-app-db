import {
  faChevronCircleRight,
  faFire,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  Image,
  VStack,
  Text,
  Icon,
  Pressable,
  Center,
} from 'native-base';
import React from 'react';
import { IMovie } from '../app/interfaces';

const MovieCard = ({
  poster_path,
  title,
  overview,
  popularity,
  vote_count,
  vote_average,
  onPress,
}: IMovie & { onPress: () => void }): JSX.Element => {
  return (
    <Box
      bg="primary.200"
      shadow={2}
      rounded="lg"
      w="100%"
      h={200}
      marginBottom={5}
      overflow="hidden"
    >
      <Pressable onPress={onPress}>
        <HStack>
          <AspectRatio h="100%" ratio={0.66}>
            <Image
              alt="No Image"
              source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
            />
          </AspectRatio>
          <VStack flex={1} p={2} space={2}>
            <Heading fontSize={18} textAlign="center" color="secondary.100">
              {title}
            </Heading>
            <Text fontSize={10} color="tertiary.100" noOfLines={4}>
              {overview}
            </Text>
            <HStack flex={1} py={3} justifyContent="center" space={5}>
              <Text color="secondary.100">
                <FontAwesomeIcon style={{ color: '#01B4E4' }} icon={faFire} />{' '}
                {popularity}
              </Text>
              <Text color="secondary.100">
                <FontAwesomeIcon style={{ color: '#01B4E4' }} icon={faStar} />{' '}
                {vote_average}{' '}
                <Text fontSize={10} color="rgba(1,180,228,0.5)">
                  ({vote_count})
                </Text>
              </Text>
            </HStack>
            <Center flex={1}>
              <HStack
                justifyContent="center"
                alignItems="center"
                space={2}
                paddingBottom={4}
              >
                <Icon
                  size="2xl"
                  as={
                    <FontAwesomeIcon
                      style={{ color: '#f5f7ff' }}
                      icon={faChevronCircleRight}
                    />
                  }
                />

                <Text color="white.50" fontSize={15}>
                  Read More
                </Text>
              </HStack>
            </Center>
          </VStack>
        </HStack>
      </Pressable>
    </Box>
  );
};

export default MovieCard;
