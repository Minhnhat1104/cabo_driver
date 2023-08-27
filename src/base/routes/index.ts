import {Route} from '@base/types/route';
// screen
import HomeScreen from '@Home/screen/HomeScreen';
import OTPScreen from '@PhoneLogin/screen/OTPVerificationScreen';
import SplashScreen from '@authentication/SplashScreen';
import PhoneLoginScreen from '@PhoneLogin/screen/PhoneLoginScreen';
import VehicleRegisterScreen from '@PhoneLogin/screen/VehicleRegisterScreen';
import OnDrive from '@OnDrive/screen';
import {screens} from '@base/config/screen';

export const routes: Route[] = [
  {
    name: screens.KEY_SCREEN_SPLASH,
    component: SplashScreen,
    options: {headerShown: false},
  },
  {
    name: screens.KEY_SCREEN_ON_DRIVE,
    component: OnDrive,
    options: {headerShown: true},
  },
  {
    name: screens.KEY_SCREEN_PHONE_LOGIN,
    component: PhoneLoginScreen,
    options: {title: 'Đăng nhập', headerShown: false},
  },
  {
    name: screens.KEY_SCREEN_VEHICLE_REGISTER,
    component: VehicleRegisterScreen,
    options: {title: 'Đăng ký phương tiện', headerShown: false},
  },
  {
    name: screens.KEY_SCREEN_OTP_VERIFICATION,
    component: OTPScreen,
    options: {title: 'Xác thực OTP'},
  },
  {
    name: screens.KEY_SCREEN_HOME,
    component: HomeScreen,
    options: {title: 'Trang chủ', headerShown: false},
  },
];
