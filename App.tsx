import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { extendTheme, NativeBaseProvider } from 'native-base';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import DetailsScreen from './src/screens/DetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#88cca5',
      100: '#70C294',
    },
    secondary: {
      50: '#032541',
      100: '#03213A',
      150: '#021627',
    },
    white: {
      50: '#f5f7ff',
      100: '#EBEFFF',
    },
    error: {
      50: '#E71D36',
    },
  },
  config: {
    initialColorMode: 'white',
  },
});

export type StackParamList = {
  Home: undefined;
  Search: undefined;
  Details: { movieID: number; name: string };
};

const Stack = createStackNavigator();
const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#f5f7ff',
                },
                headerTitleStyle: {
                  color: '#032541',
                },
                headerTitleAlign: 'center',
                title: 'Search for movies',
                headerLeft: () => null,
              }}
            />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};
export default App;
