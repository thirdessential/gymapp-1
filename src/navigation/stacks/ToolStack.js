import React from "react";

import Stack from "./stack";
import RouteNames from "../RouteNames";
import openDrawerButton from "../openDrawerButton";

import Tools from "../../screens/App/Tools";
import {defaultHeaderStyle} from "../../constants/styles";
import RightHeader from "../RightHeader";

const toolStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderStyle}>
      <Stack.Screen
        name={RouteNames.Tools}
        component={Tools}
        options={{
          title: "Tools",
          headerLeft: openDrawerButton,
          headerRight: () => <RightHeader userData={this.props.userData}/>
        }}
      />
    </Stack.Navigator>
  );
};

export default toolStack;
