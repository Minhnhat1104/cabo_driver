import HomeScreen from '@authentication/HomeScreen';
import {Route} from '@base/types/route';
import OTPScreen from '@authentication/OTPVerificationScreen';
import PhoneLoginScreen from '@authentication/PhoneLoginScreen';
import SplashScreen from '@authentication/SplashScreen';
import {
  SCREEN_SPLASH,
  SCREEN_PHONE_LOGIN,
  SCREEN_OTP_VERIFICATION,
  SCREEN_HOME,
} from '@base/config/constants';

export const routes: Route[] = [
  {
    name: SCREEN_SPLASH,
    component: SplashScreen,
    options: {headerShown: false},
  },
  {
    name: SCREEN_PHONE_LOGIN,
    component: PhoneLoginScreen,
    options: {title: 'Đăng nhập', headerShown: false},
  },
  {
    name: SCREEN_OTP_VERIFICATION,
    component: OTPScreen,
    options: {title: 'Xác thực OTP'},
  },
  {
    name: SCREEN_HOME,
    component: HomeScreen,
    options: {title: 'Trang chủ'},
  },
];
