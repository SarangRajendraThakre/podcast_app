// navigation/types.ts
export type RootStackParamList = {
  SplashScreen: undefined;
  Login: undefined;
  Otp: { phone: string };
  Home: { phone: string };
};
