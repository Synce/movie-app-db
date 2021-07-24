import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Box } from 'native-base';

import { StackParamList } from '../../App';

import Loader from '../components/Loader';
import { selectDetails, fetchDetails } from '../app/DetailsDataSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { ProfileScreenNavigationProp } from '../app/interfaces';
import { selectStatus } from '../app/MovieDataSlice';

type ProfileScreenRouteProp = RouteProp<StackParamList, 'Details'>;
interface IDetailsScreen {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
}
const DetailsScreen = ({ route, navigation }: IDetailsScreen): JSX.Element => {
  const { movieID } = route.params;
  const details = useAppSelector(selectDetails(movieID));
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!details) dispatch(fetchDetails(movieID));
  }, [details, dispatch, movieID]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: details?.title,
    });
  }, [details, navigation]);

  return (
    <View>
      <Loader
        status={status}
        errorMasage="Something wrong happend..."
        loading="Loading Details..."
      >
        <Box>{details && <Text>{details.title} </Text>}</Box>
      </Loader>
    </View>
  );
};

export default DetailsScreen;
