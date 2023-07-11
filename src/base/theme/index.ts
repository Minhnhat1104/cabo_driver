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
      containerStyle: {
        padding: 0,
        margin: 0,
        paddingHorizontal: 0,
        width: '100%',
        height: 50,
      },
      inputContainerStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        margin: 0,
        padding: 0,
        backgroundColor: 'white',
      },
      inputStyle: {paddingLeft: 8, color: 'black', borderRadius: 4},
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
