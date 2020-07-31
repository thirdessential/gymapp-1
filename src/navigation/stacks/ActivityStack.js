import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";
import openDrawerButton from "../openDrawerButton";
import Activity from "../../screens/App/Activity";
import Profile from "../../screens/App/Profile";
import {defaultHeaderStyle} from "../../constants/styles";

const activity = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderStyle}>
      <Stack.Screen
        name={RouteNames.Activity}
        component={Activity}
        options={{
          title: 'Activity',
          headerLeft: openDrawerButton
        }}
      />
      <Stack.Screen name={RouteNames.Profile} component={Profile}
                    options={{title: '', headerTransparent: true}}/>
    </Stack.Navigator>
  )
}

export default activity;