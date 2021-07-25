import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import DetailsScreen from './src/screens/DetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import theme from './theme';

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
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#071422',
              },
              headerTitleStyle: {
                color: '#01B4E4',
              },
              headerTitleAlign: 'center',
              headerTintColor: '#01B4E4',
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
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
