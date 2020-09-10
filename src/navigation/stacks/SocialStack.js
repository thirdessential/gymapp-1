import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";
import openDrawerButton from "../openDrawerButton";
import Community from "../../screens/Social/Community";
import {defaultHeaderStyle} from "../../constants/styles";
import RightHeader from "../RightHeader";

const listing = (props) => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderStyle}>
      <Stack.Screen
        name={RouteNames.Community}
        component={Community}
        options={{
          title: 'Community',
          headerLeft: openDrawerButton,
          headerRight: () => <RightHeader userData={this.props.userData}/>
        }}/>
    </Stack.Navigator>
  );
}

export default listing;