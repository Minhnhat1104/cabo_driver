import {ThemeProvider, Button, createTheme} from '@rneui/themed';

export const theme = createTheme({
  components: {
    Button: {
      raised: true,
    },
  },
});

export const Color = {
  primary: '#fff',
  secondary: '0xFF403949',
  accent: '0xFFffc6bc',
  blueBackground: '0xFFD3F5FE',
  purpleBackground: '0xFFEEE1FF',
  yellowBackground: '0xFFE6F69C',
  orangeBackground: '0xFFFEE0C4',
};
