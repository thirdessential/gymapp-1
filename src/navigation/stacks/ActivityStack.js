import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";

import {appTheme} from "../../constants/colors";
import openDrawerButton from "../openDrawerButton";
import Activity from "../../screens/App/Activity";
import fonts from "../../constants/fonts";
import Profile from "../../screens/App/Profile";

const activity = () => {
  return (
    <Stack.Navigator>
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
      <Stack.Screen name={RouteNames.Profile} component={Profile}
                    options={{title: '', headerTintColor: appTheme.brightContent, headerTransparent: true}}/>
      {/*<Stack.Screen*/}
      {/*  name={RouteNames.BMI}*/}
      {/*  component={BMI}*/}
      {/*  options={{*/}
      {/*    title: 'BMI',*/}
      {/*    headerTintColor: appTheme.brightContent,*/}
      {/*    headerStyle: {*/}
      {/*      backgroundColor: appTheme.darkBackground,*/}
      {/*    },*/}
      {/*    headerTitleStyle: {*/}
      {/*      fontFamily: fonts.PoppinsRegular*/}
      {/*    }*/}
      {/*  }}*/}
      {/*/>*/}
    </Stack.Navigator>
  )
}



export default activity;