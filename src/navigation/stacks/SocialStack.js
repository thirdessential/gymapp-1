import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";
import {appTheme} from "../../constants/colors";
import fonts from "../../constants/fonts";
import openDrawerButton from "../openDrawerButton";
import Community from "../../screens/Social/Community";
import PostViewer from "../../screens/Social/PostViewer";
import Profile from "../../screens/App/Profile";

const listing = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteNames.Community}
        component={Community}
        options={{
          title: 'Community',
          headerTintColor: appTheme.brightContent,
          headerStyle: {
            backgroundColor: appTheme.darkBackground,
          },
          headerTitleStyle: {
            fontFamily: fonts.PoppinsRegular
          },
          headerLeft: openDrawerButton
        }}/>
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
      <Stack.Screen name={RouteNames.Profile} component={Profile}
                    options={{title: '', headerTintColor: appTheme.brightContent, headerTransparent: true}}/>
    </Stack.Navigator>
  );
}

export default listing;