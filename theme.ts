import { extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      100: '#0D253F',
      200: '#071422',
    },
    secondary: {
      100: '#01B4E4',
    },
    tertiary: {
      100: '#06D6A0',
    },
    error: {
      50: '#E71D36',
    },
    white: {
      50: '#f5f7ff',
    },
  },

  config: {
    initialColorMode: 'dark',
  },
});

export default theme;
