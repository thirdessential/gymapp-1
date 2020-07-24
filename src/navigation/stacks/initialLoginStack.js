import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import Stack from './stack';
import RouteNames from "../RouteNames";
import PreferenceSwiper from "../../screens/App/Preference/PreferenceSwiper";
import {appTheme} from "../../constants/colors";

const initialLoginUpScreen = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name={RouteNames.PreferenceSwiper}
          component={PreferenceSwiper}
          options={{
            title: '',
            headerTintColor: appTheme.brightContent,
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default initialLoginUpScreen;