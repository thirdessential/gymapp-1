import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import Stack from './stack';
import RouteNames from "../RouteNames";
import {appTheme} from "../../constants/colors";
import Terms from "../../screens/Auth/Terms";
import PdfViewer from "../../screens/App/PdfViewer";

const termsStack = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{

      }}>
        <Stack.Screen
          name={RouteNames.Terms}
          component={Terms}
          options={{
            title: '',
            headerTintColor: appTheme.brightContent,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name={RouteNames.PdfViewer}
          component={PdfViewer}
          options={{
            title: "",
            headerTintColor: appTheme.brightContent,
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default termsStack;