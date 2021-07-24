import { Spinner, Text } from 'native-base';
import React from 'react';

import { Status } from '../app/enums';

interface ILoader {
  status: Status;
  children: JSX.Element;
  errorMasage: string;
  loading: string;
}

const Loader = ({
  status,
  children,
  loading,
  errorMasage,
}: ILoader): JSX.Element => {
  const result =
    status === Status.LOADING ? (
      <Spinner color="primary.50" accessibilityLabel={loading} />
    ) : (
      <Text color="error.50" fontSize="xl">
        {errorMasage}
      </Text>
    );

  return status === Status.SUCCESS ? children : result;
};

export default Loader;
