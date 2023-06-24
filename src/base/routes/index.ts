import HomeScreen from '@authentication/HomeScreen';
import {Route} from '@base/types/route';
import OTPScreen from '@authentication/OTPVerificationScreen';
import PhoneLoginScreen from '@authentication/PhoneLoginScreen';
import SplashScreen from '@authentication/SplashScreen';

export const routes: Route[] = [
  {
    name: 'Splash',
    component: SplashScreen,
    options: {headerShown: false},
  },
  {
    name: 'PhoneLogin',
    component: PhoneLoginScreen,
    options: {title: 'Đăng nhập', headerShown: false},
  },
  {
    name: 'OTPVerification',
    component: OTPScreen,
    options: {title: 'Xác thực OTP'},
  },
  {
    name: 'Home',
    component: HomeScreen,
    options: {title: 'Trang chủ'},
  },
];
