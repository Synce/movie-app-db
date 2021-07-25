import React from 'react';
import {
  AspectRatio,
  Heading,
  HStack,
  Image,
  ScrollView,
  Text,
  Box,
  Container,
} from 'native-base';
import { faFire, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IDetails } from '../app/interfaces';
import Chip from './Chip';

const MovieDetails = ({
  poster_path,
  title,
  popularity,
  vote_average,
  vote_count,
  genres,
  overview,
  production_countries,
  budget,
  release_date,
}: IDetails): JSX.Element => {
  return (
    <ScrollView p={2}>
      <HStack
        shadow={2}
        borderRadius={20}
        overflow="hidden"
        bg="primary.200"
        flex={1}
        justifyContent="space-between"
      >
        <AspectRatio h={200} ratio={0.66}>
          <Image
            alt="No Image"
            shadow={2}
            source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
          />
        </AspectRatio>

        <Box flex={1} alignItems="center" justifyContent="center">
          <Container flexDirection="column" alignItems="center">
            <Heading fontSize={25} textAlign="center" color="secondary.100">
              {title}
            </Heading>
            <HStack
              flex={1}
              py={3}
              justifyContent="center"
              alignItems="center"
              space={5}
            >
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
            <Heading
              my={5}
              fontSize={13}
              textAlign="center"
              color="secondary.100"
            >
              Release date: {release_date}
            </Heading>
          </Container>
        </Box>
      </HStack>
      <ScrollView horizontal m={2} w="100%">
        <HStack space={1}>
          {genres.map(value => (
            <Chip key={value.id} value={value.name} />
          ))}
        </HStack>
      </ScrollView>
      <Box
        shadow={2}
        p={5}
        m={2}
        marginTop={0}
        bg="primary.200"
        borderRadius={20}
        overflow="hidden"
      >
        <Heading fontSize={15} textAlign="center" color="secondary.100">
          Overview
        </Heading>
        <Text fontSize={14} color="tertiary.100">
          {overview}
        </Text>
        {production_countries.length > 0 && (
          <Text marginTop={5} fontSize={14} color="tertiary.100">
            Production:{' '}
            {
              production_countries.reduce((total, value) => {
                return { name: `${total.name} ${value.name}` };
              }).name
            }
          </Text>
        )}
        {budget > 0 && (
          <Text marginTop={2} fontSize={14} color="tertiary.100">
            {`Budget: ${budget / 1000000} mln $`}
          </Text>
        )}
      </Box>
    </ScrollView>
  );
};

export default MovieDetails;
