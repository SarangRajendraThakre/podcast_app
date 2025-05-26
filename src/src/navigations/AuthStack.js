import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import navigationStrings from '../constants/navigationStrings';
import {Login, OtpScreen, Success, } from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <>
      <Stack.Screen name={navigationStrings.LOGIN} component={Login} />
      <Stack.Screen name={navigationStrings.OTP_SCREEN} component={OtpScreen} />
      <Stack.Screen name={navigationStrings.SUCCESS} component={Success} />
    </>
  );
};

export default AuthStack;
