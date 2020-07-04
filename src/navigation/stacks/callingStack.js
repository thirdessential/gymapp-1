import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import Stack from './stack';
import RouteNames from "../RouteNames";
import CallScreen from "../../screens/Call/CallScreen";
import VideoCall from "../../screens/Call/VideoCall";
import {appTheme} from "../../constants/colors";

const callingScreen = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name={RouteNames.CallScreen}
          component={CallScreen}
          options={{title: '', headerTintColor: appTheme.brightContent, headerTransparent: true}}
        />
        <Stack.Screen
          name={RouteNames.VideoCall}
          component={VideoCall}
          options={{
            headerTransparent: true,
            headerLeft: () => null,
            title: ''
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default callingScreen;