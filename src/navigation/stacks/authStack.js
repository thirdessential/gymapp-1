import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import RouteNames from "../RouteNames";
import Stack from './stack';

import ChooseUserType from "../../screens/Auth/ChooseUserType";
import LoginTwo from "../../screens/Auth/LoginTwo";
import SignupTwo from "../../screens/Auth/SignupTwo";
import Listings from "../../screens/Auth/Listings";
import SignInWithRegisteredEmail from "../../screens/Auth/SignInWithRegisteredEmail";
import EmailVerification from "../../screens/Auth/EmailVerification";
import TrainerSignupDetails from "../../screens/Auth/TrainerSignupDetails";
import TrainerHomeScreen from "../../screens/Auth/TrainerHomeScreen";
// import VideoCall from "../../screens/Call/VideoCall";

const noHeader = {title: '', headerStyle: {height: 0}}

const authStack = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{
        headerStyle: {},
      }}
      >
        <Stack.Screen name={RouteNames.ChooseUserType} component={ChooseUserType} options={noHeader}/>
        <Stack.Screen name={RouteNames.Login} component={LoginTwo} options={{title: ''}}/>
        <Stack.Screen name={RouteNames.Signup} component={SignupTwo} options={{title: 'Sign up'}}/>
        <Stack.Screen name="Listings" component={Listings}/>
        <Stack.Screen name="signInWithRegisteredEmail" component={SignInWithRegisteredEmail}
                      options={{title: 'Sign in'}}/>
        <Stack.Screen name="EmailVerification" component={EmailVerification} options={{title: ''}}/>
        <Stack.Screen name="TrainerSignupDetails" component={TrainerSignupDetails}
                      options={{title: 'Enter details'}}/>
        <Stack.Screen name="TrainerHomeScreen" component={TrainerHomeScreen} options={{title: ''}}/>
        {/*<Stack.Screen name={RouteNames.VideoCall} component={VideoCall} options={noHeader}/>*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default authStack;