import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";

import MyProfile from "../../screens/App/MyProfile";
import ProfileEdit from "../../screens/App/ProfileEdit";
import {appTheme} from "../../constants/colors";
import openDrawerButton from "../openDrawerButton";
import PostViewer from "../../screens/Social/PostViewer";
import fonts from "../../constants/fonts";
import PreferenceSwiper from "../../screens/App/Preference/PreferenceSwiper";

const myProfile = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteNames.MyProfile}
        component={MyProfile}
        options={{
          title: '',
          headerTintColor: appTheme.brightContent,
          headerTransparent: true,
          headerLeft: openDrawerButton
        }}
      />
      <Stack.Screen
        name={RouteNames.ProfileEdit}
        component={PreferenceSwiper}
        options={{
          title: '',
          headerTintColor: appTheme.brightContent,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name={RouteNames.PostViewer}
        component={PostViewer}
        options={{
          title: 'Comments',
          headerTintColor: appTheme.brightContent,
          headerStyle: {
            backgroundColor: appTheme.darkBackground,
          },
          headerTitleStyle: {
            fontFamily: fonts.PoppinsRegular
          },
        }}/>
    </Stack.Navigator>
  )
}

export default myProfile;