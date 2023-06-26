import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import {ThemeProvider} from '@rneui/themed';
import {theme} from '@base/theme';
import {routes} from '@base/routes';
import {Route} from '@base/types/route';
import {SCREEN_SPLASH} from '@base/config/constants';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={SCREEN_SPLASH}>
          {routes?.map((_route: Route, i: number) => (
            <Stack.Screen
              key={i}
              name={_route?.name}
              component={_route?.component}
              options={_route?.options}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
