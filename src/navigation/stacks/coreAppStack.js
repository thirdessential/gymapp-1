import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import Stack from './stack';
import RouteNames from "../RouteNames";
// import UserListing from "../../screens/App/UserListing";
import Profile from "../../screens/App/Profile";
import Packages from "../../screens/App/Packages";
import VideoCall from "../../screens/Call/VideoCall";
import HomeTab from '../tabs/homeTab';
import Schedule  from "../../screens/App/Schedule";
import {appTheme} from "../../constants/colors";
const noHeader = {title: '', headerStyle: {height: 0}}

const coreApplication = ({navigationRef}) => {
  return (
      <Stack.Navigator>
        <Stack.Screen name={RouteNames.HomeTab} component={HomeTab} options={{title: 'Overview' ,headerTintColor:appTheme.brightContent,headerStyle:{
          backgroundColor:appTheme.darkGrey,
            }}}/>
        <Stack.Screen name={RouteNames.Profile} component={Profile} options={{title:'',headerTintColor:appTheme.brightContent,headerTransparent:true}}/>
        <Stack.Screen name={RouteNames.Packages} component={Packages}/>
        <Stack.Screen name={RouteNames.VideoCall} component={VideoCall} options={noHeader}/>
        <Stack.Screen name={RouteNames.Schedule} component={Schedule} options={{title:'',headerTransparent:true}}/>

      </Stack.Navigator>
  );
}

export default coreApplication;