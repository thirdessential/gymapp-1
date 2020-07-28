import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";

import MyProfile from "../../screens/App/MyProfile";

import openDrawerButton from "../openDrawerButton";
import PostViewer from "../../screens/Social/PostViewer";
import PreferenceSwiper from "../../screens/App/Preference/PreferenceSwiper";
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
      <Stack.Screen
        name={RouteNames.ProfileEdit}
        component={PreferenceSwiper}
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name={RouteNames.PostViewer}
        component={PostViewer}
        options={{
          title: 'Comments',
        }}/>
    </Stack.Navigator>
  )
}

export default myProfile;