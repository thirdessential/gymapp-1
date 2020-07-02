import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";

import MyProfile from "../../screens/App/MyProfile";
import ProfileEdit from "../../screens/App/ProfileEdit";

const myProfile = () => {
  return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={RouteNames.MyProfile} component={MyProfile}/>
        <Stack.Screen name={RouteNames.ProfileEdit} component={ProfileEdit}/>
      </Stack.Navigator>
  )
}

export default myProfile;