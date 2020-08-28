import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import RouteNames from "../RouteNames";
import Stack from './stack';

import SignIn from '../../screens/Auth/SignIn';
import SignUp from '../../screens/Auth/SignUp';
import ForgotPasswordScreen from '../../screens/Auth/ForgotPassword';
import PdfViewer from "../../screens/App/PdfViewer";
import {defaultHeaderStyle} from "../../constants/styles";

const blankHeader = {
  title: "",
  headerTransparent: true,
};
const authStack = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={defaultHeaderStyle}>
        <Stack.Screen name={RouteNames.SignIn} component={SignIn} options={blankHeader}/>
        <Stack.Screen name={RouteNames.SignUp} component={SignUp} options={blankHeader}/>
        <Stack.Screen name={RouteNames.ForgotPassword} component={ForgotPasswordScreen}
                      options={blankHeader}/>
        <Stack.Screen
          name={RouteNames.PdfViewer}
          component={PdfViewer}
          options={blankHeader}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default authStack;