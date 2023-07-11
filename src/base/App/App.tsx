import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClient, QueryClientProvider} from 'react-query';
const Stack = createStackNavigator();

import {ThemeProvider} from '@rneui/themed';
import {theme} from '@base/theme';
import {routes} from '@base/routes';
import {Route} from '@base/types/route';
import {SCREEN_SPLASH} from '@base/config/constants';
import {firebase} from '@react-native-firebase/app-check';
const queryClient = new QueryClient();

const App = () => {
  const appCheck = firebase.appCheck();

  // Initialize App Check with DebugAppCheckProvider
  // Enable debug mode with DebugAppCheckProvider
  const __DEV__ = true;

  const rnfbProvider = firebase
    .appCheck()
    .newReactNativeFirebaseAppCheckProvider();
  rnfbProvider.configure({
    android: {
      provider: __DEV__ ? 'debug' : 'playIntegrity',
      debugToken: '569BD4EA-1970-47DA-B57D-25870A025114',
    },
    apple: {
      provider: __DEV__ ? 'debug' : 'appAttestWithDeviceCheckFallback',
      debugToken: '569BD4EA-1970-47DA-B57D-25870A025114',
    },
    web: {
      provider: 'reCaptchaV3',
      siteKey: 'unknown',
    },
  });

  appCheck.initializeAppCheck({
    provider: rnfbProvider,
    isTokenAutoRefreshEnabled: true,
  });

  const gotToken = async () => {
    const token = await appCheck.getToken();
  };
  useEffect(() => {
    gotToken();
  }, []);
  // firebase.appCheck().activate('your_debug_token', true);
  // appCheck.setTokenDebuggable(true);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
