import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import RouteNames from "../RouteNames";
import Stack from './stack';

import ChooseUserType from "../../screens/Auth/ChooseUserType";
import Login from "../../screens/Auth/Login";
import Signup from "../../screens/Auth/Signup";
import SignInWithRegisteredEmail from "../../screens/Auth/SignInWithRegisteredEmail";
import SignInNew from '../../screens/Auth/SignInNew';
import ForgotPasswordScreen from '../../screens/Auth/ForgotPasswordScreen';
import SignUpNew from '../../screens/Auth/SignUpNew';
import StreamScreen from '../../screens/Auth/StreamScreen';
import ShowStreamVideo from '../../screens/Auth/ShowStreamVideo';
const authStack = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={RouteNames.SignInNew} component={SignInNew} options={{title: ''}}/>
        <Stack.Screen name={RouteNames.SignUpNew} component={SignUpNew} options={{title: 'Sign up'}}/>
        <Stack.Screen name={RouteNames.StreamScreen} component={StreamScreen} options={{title: 'Stream'}} />
        <Stack.Screen name={RouteNames.ShowStreamVideo} component={ShowStreamVideo} options={{title: 'VideoStream'}} />
        <Stack.Screen name={RouteNames.ForgotPasswordScreen} component={ForgotPasswordScreen} options={{title: 'ForgotPasswordScreen'}} />

        <Stack.Screen name="signInWithRegisteredEmail" component={SignInWithRegisteredEmail}
                      options={{title: 'Sign in'}}/>
        <Stack.Screen name={RouteNames.ChooseUserType} component={ChooseUserType}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default authStack;