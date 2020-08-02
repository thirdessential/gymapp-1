import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import RouteNames from "../RouteNames";
import Stack from './stack';

import SignIn from '../../screens/Auth/SignIn';
import SignUp from '../../screens/Auth/SignUp';
import ForgotPasswordScreen from '../../screens/Auth/ForgotPasswordScreen';
import StreamScreen from '../../screens/Auth/StreamScreen';
import ShowStreamVideo from '../../screens/Auth/ShowStreamVideo';

const authStack = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={RouteNames.SignIn} component={SignIn} options={{title: ''}}/>
        <Stack.Screen name={RouteNames.SignUp} component={SignUp} options={{title: 'Sign up'}}/>
        <Stack.Screen name={RouteNames.StreamScreen} component={StreamScreen} options={{title: 'Stream'}} />
        <Stack.Screen name={RouteNames.ShowStreamVideo} component={ShowStreamVideo} options={{title: 'VideoStream'}} />
        <Stack.Screen name={RouteNames.ForgotPasswordScreen} component={ForgotPasswordScreen} options={{title: 'ForgotPasswordScreen'}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default authStack;