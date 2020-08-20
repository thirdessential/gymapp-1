import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";
import openDrawerButton from "../openDrawerButton";
import Community from "../../screens/Social/Community";
import {defaultHeaderStyle} from "../../constants/styles";
import NotificationList from "../../components/NotificationList";

const listing = (props) => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderStyle}>
      <Stack.Screen
        name={RouteNames.Community}
        component={Community}
        options={{
          title: 'Community',
          headerLeft: openDrawerButton,
          headerRight: ()=><NotificationList/>
        }}/>
    </Stack.Navigator>
  );
}

export default listing;