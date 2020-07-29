import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";
import {appTheme} from "../../constants/colors";
import fonts from "../../constants/fonts";
import openDrawerButton from "../openDrawerButton";
import Community from "../../screens/Social/Community";
import PostViewer from "../../screens/Social/PostViewer";
import Profile from "../../screens/App/Profile";
import CreatePost from "../../screens/Social/CreatePost";
import {defaultHeaderStyle} from "../../constants/styles";


const listing = (props) => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderStyle}>
      <Stack.Screen
        name={RouteNames.Community}
        component={Community}
        options={{
          title: 'Community',
          headerLeft: openDrawerButton,
        }}/>
      <Stack.Screen
        name={RouteNames.PostViewer}
        component={PostViewer}
        options={{
          title: 'Comments',
        }}/>
      <Stack.Screen name={RouteNames.Profile} component={Profile}
                    options={{title: '', headerTransparent: true}}/>
      <Stack.Screen
        name={RouteNames.CreatePost}
        component={CreatePost}
        options={{
          title: 'Create post',
        }}/>
    </Stack.Navigator>
  );
}

export default listing;