import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import RouteNames from "../RouteNames";
import Stack from './stack';
import ChooseUserType from "../../screens/Auth/ChooseUserType";

const newUserStack = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={RouteNames.ChooseUserType} component={ChooseUserType}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default newUserStack;