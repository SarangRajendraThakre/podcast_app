
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import AuthStack from './AuthStack';



const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
<>
<NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}>
      {AuthStack()} 
    </Stack.Navigator>
</NavigationContainer>

</>
  )
}

export default Routes

