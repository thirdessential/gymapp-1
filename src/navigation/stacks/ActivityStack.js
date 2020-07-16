import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";

import {appTheme} from "../../constants/colors";
import openDrawerButton from "../openDrawerButton";
import Activity from "../../screens/App/Activity";
import fonts from "../../constants/fonts";
import MyAppointments from "../../screens/App/MyAppointments";

const activity = () => {
  return (
    <Stack.Navigator initialRouteName={RouteNames.MyAppointments}>
      <Stack.Screen
        name={RouteNames.Activity}
        component={Activity}
        options={{
          title: 'Activity',
          headerTintColor: appTheme.brightContent,
          headerStyle: {
            backgroundColor: appTheme.darkBackground,
          },
          headerTitleStyle: {
            fontFamily: fonts.PoppinsRegular
          },
          headerLeft: openDrawerButton

        }}
      />
      <Stack.Screen
        name={RouteNames.MyAppointments}
        component={MyAppointments}
        options={{
          title: 'My Appointments',
          headerTintColor: appTheme.brightContent,
          headerStyle: {
            backgroundColor: appTheme.darkBackground,
          },
          headerTitleStyle: {
            fontFamily: fonts.PoppinsRegular
          },
        }}
      />
    </Stack.Navigator>
  )
}

export default activity;