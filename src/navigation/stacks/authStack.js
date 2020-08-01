import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import RouteNames from "../RouteNames";
import Stack from './stack';

import SignIn from '../../screens/Auth/SignIn';
import SignUp from '../../screens/Auth/SignUp';

const authStack = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={RouteNames.SignIn} component={SignIn} options={{title: ''}}/>
        <Stack.Screen name={RouteNames.SignUp} component={SignUp} options={{title: 'Sign up'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default authStack;