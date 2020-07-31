import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import RouteNames from "../RouteNames";
import Stack from './stack';

import ChooseUserType from "../../screens/Auth/ChooseUserType";
import SignInWithRegisteredEmail from "../../screens/Auth/SignInWithRegisteredEmail";
import SignInNew from '../../screens/Auth/SignInNew';
import SignUpNew from '../../screens/Auth/SignUpNew';

const authStack = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={RouteNames.SignInNew} component={SignInNew} options={{title: ''}}/>
        <Stack.Screen name={RouteNames.SignUpNew} component={SignUpNew} options={{title: 'Sign up'}}/>
        <Stack.Screen name="signInWithRegisteredEmail" component={SignInWithRegisteredEmail}
                      options={{title: 'Sign in'}}/>
        <Stack.Screen name={RouteNames.ChooseUserType} component={ChooseUserType}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default authStack;