import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { extendTheme, NativeBaseProvider } from 'native-base';
import React from 'react';
import DetailsScreen from './screens/DetailsScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#88cca5',
    },
    secondary: {
      50: '#032541',
    },
  },
  config: {
    initialColorMode: 'dark',
  },
});

export type StackParamList = {
  Home: undefined;
  Search: undefined;
  Details: undefined;
};

const Stack = createStackNavigator();
const App = (): JSX.Element => {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
