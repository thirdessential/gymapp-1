import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";
import {appTheme} from "../../constants/colors";
import fonts from "../../constants/fonts";
import openDrawerButton from "../openDrawerButton";
import Community from "../../screens/Social/Community";
import PostViewer from "../../screens/Social/PostViewer";
import Profile from "../../screens/App/Profile";
import HalfRoundedButton from "../../components/HalfRoundedButton";
import strings from "../../constants/strings";
import {View} from "react-native";
import CreatePost from "../../screens/Social/CreatePost";
import {spacing} from "../../constants/dimension";


const listing = (props) => {
  // const renderCreatePost = () => (
  //   <View style={{marginRight: spacing.medium_lg}}>
  //     <HalfRoundedButton onPress={() => props.navigation.navigate(RouteNames.CreatePost)} title={strings.ADD_POST}/>
  //   </View>
  // )
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
          headerLeft: openDrawerButton,
          // headerRight: renderCreatePost
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
      <Stack.Screen
        name={RouteNames.CreatePost}
        component={CreatePost}
        options={{
          title: 'Create post',
          headerTintColor: appTheme.brightContent,
          headerStyle: {
            backgroundColor: appTheme.darkBackground,
          },
          headerTitleStyle: {
            fontFamily: fonts.PoppinsRegular
          },
        }}/>
    </Stack.Navigator>
  );
}

export default listing;