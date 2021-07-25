import React, { useEffect, useLayoutEffect } from 'react';

import { RouteProp } from '@react-navigation/native';
import { Box } from 'native-base';

import { StackParamList } from '../../App';

import Loader from '../components/Loader';
import { selectDetails, fetchDetails } from '../app/DetailsDataSlice';
import {
  useAppSelector,
  useAppDispatch,
  useCustomBackAction,
} from '../app/hooks';
import { ProfileScreenNavigationProp } from '../app/interfaces';
import { selectFetchStatus } from '../app/MovieDataSlice';
import MovieDetails from '../components/MovieDetails';

type ProfileScreenRouteProp = RouteProp<StackParamList, 'Details'>;
interface IDetailsScreen {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
}
const DetailsScreen = ({ route, navigation }: IDetailsScreen): JSX.Element => {
  const { movieID } = route.params;
  const details = useAppSelector(selectDetails(movieID));
  const status = useAppSelector(selectFetchStatus);
  const dispatch = useAppDispatch();

  useCustomBackAction(() => {
    navigation.goBack();
    return true;
  });

  useEffect(() => {
    if (!details) dispatch(fetchDetails(movieID));
  }, [details, dispatch, movieID]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: details?.title,
    });
  }, [details, navigation]);

  return (
    <Box flex={1} bg="primary.100">
      <Loader
        enable
        status={status}
        errorMasage="Something wrong happend..."
        loading="Loading Details..."
      >
        <Box>{details && <MovieDetails {...details} />} </Box>
      </Loader>
    </Box>
  );
};

export default DetailsScreen;
