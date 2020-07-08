import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";

import MyProfile from "../../screens/App/MyProfile";
import ProfileEdit from "../../screens/App/ProfileEdit";
import {appTheme} from "../../constants/colors";
import openDrawerButton from "../openDrawerButton";
import VideoCall from "../../screens/Call/VideoCall";

const myProfile = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name={RouteNames.MyProfile}
          component={MyProfile}
          options={{
            title:'',
            headerTintColor: appTheme.brightContent,
            headerTransparent: true,
            headerLeft: openDrawerButton
          }}
        />
        <Stack.Screen
          name={RouteNames.ProfileEdit}
          component={ProfileEdit}
          options={{
            title:'',
            headerTintColor: appTheme.brightContent,
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
  )
}

export default myProfile;