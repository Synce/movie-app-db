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
      bg="secondary.50"
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
            <Heading fontSize={15} textAlign="center" color="primary.50">
              {title}
            </Heading>
            <Text fontSize={10} color="primary.50" noOfLines={4}>
              {overview}
            </Text>
            <HStack>
              <Text>
                <FontAwesomeIcon style={{ color: '#f5f7ff' }} icon={faFire} />
                {popularity}
              </Text>
              <Text>
                <FontAwesomeIcon style={{ color: '#f5f7ff' }} icon={faStar} />
                {vote_average} <Text> ({vote_count})</Text>
              </Text>
            </HStack>
            <HStack
              flex={1}
              alignItems="center"
              justifyContent="center"
              space={2}
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

              <Text fontSize={20}>Read More</Text>
            </HStack>
          </VStack>
        </HStack>
      </Pressable>
    </Box>
  );
};

export default MovieCard;
