import { Spinner, Text } from 'native-base';
import React from 'react';

import { Status } from '../app/enums';

interface ILoader {
  status: Status;
  children: JSX.Element;
  errorMasage: string;
  loading: string;
  enable?: boolean;
}

const Loader = ({
  status,
  children,
  loading,
  errorMasage,
  enable = true,
}: ILoader): JSX.Element => {
  const result =
    status === Status.LOADING ? (
      <Spinner color="white.50" accessibilityLabel={loading} />
    ) : (
      <Text color="error.50" fontSize="xl">
        {errorMasage}
      </Text>
    );

  return status === Status.SUCCESS || !enable ? children : result;
};

export default Loader;
