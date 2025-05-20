import { View, Text } from 'react-native'
import React from 'react'
import { navigationRef } from '../utils/NavigationUtils';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../features/auth/SplashScreen';
import LoginScreen from '../features/auth/LoginScreen';
import RegisterScreen from '../features/auth/RegisterScreen';
import  { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserBottomTab from '../features/tabs/UserBottomTab';
import HomeScreen from '../features/home/HomeScreen';
import { RootStackParamList } from './types';
import OtpScreen from '../features/auth/OtpScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation