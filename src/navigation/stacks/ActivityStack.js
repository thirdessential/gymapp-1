import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";

import {appTheme} from "../../constants/colors";
import openDrawerButton from "../openDrawerButton";
import Activity from "../../screens/App/Activity";

const activity = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteNames.Activity}
        component={Activity}
        options={{
          title:'Activity',
          headerTintColor: appTheme.brightContent,
          headerLeft: openDrawerButton
        }}
      />
    </Stack.Navigator>
  )
}

export default activity;