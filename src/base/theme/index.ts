import {Theme, createTheme} from '@rneui/themed';
import {ThemeProvider, Button} from 'react-native-elements';

export const Color = {
  secondary: '#403949',
  accent: '#ffc6bc',
  blueBackground: '#D3F5FE',
  purpleBackground: '#EEE1FF',
  yellowBackground: '#E6F69C',
  orangeBackground: '#FEE0C4',
};

export const theme = createTheme({
  components: {
    Button: {
      raised: true,
      buttonStyle: {
        margin: 0,
      },
    },
    Input: {
      inputContainerStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        margin: 0,
        backgroundColor: 'white',
      },
      inputStyle: {paddingLeft: 16},
      errorStyle: {height: 0, margin: 0},
      placeholder: 'Enter text',
    },
  },
  lightColors: {
    primary: Color.accent,
    secondary: Color.secondary,
    background: '#000',
  },
  mode: 'light',
});
