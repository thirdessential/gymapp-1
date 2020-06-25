import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import Stack from './stack';
import RouteNames from "../RouteNames";
// import UserListing from "../../screens/App/UserListing";
import Profile from "../../screens/App/Profile";
import Packages from "../../screens/App/Packages";
import VideoCall from "../../screens/Call/VideoCall";
import HomeTab from '../tabs/homeTab';
const noHeader = {title: '', headerStyle: {height: 0}}

const coreApplication = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name={RouteNames.HomeTab} component={HomeTab} options={{title: 'Home'}}/>
        <Stack.Screen name={RouteNames.Profile} component={Profile}/>
        <Stack.Screen name={RouteNames.Packages} component={Packages}/>
        <Stack.Screen name={RouteNames.VideoCall} component={VideoCall} options={noHeader}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default coreApplication;