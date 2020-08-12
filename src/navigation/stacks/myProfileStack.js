import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";

import MyProfile from "../../screens/App/MyProfile";

import openDrawerButton from "../openDrawerButton";
import {defaultHeaderStyle} from "../../constants/styles";

const myProfile = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderStyle}>
      <Stack.Screen
        name={RouteNames.MyProfile}
        component={MyProfile}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: openDrawerButton
        }}
      />
    </Stack.Navigator>
  )
}

export default myProfile;