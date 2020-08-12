import React from "react";

import Stack from "./stack";
import RouteNames from "../RouteNames";
import openDrawerButton from "../openDrawerButton";

import Tools from "../../screens/App/Tools";
import {defaultHeaderStyle} from "../../constants/styles";

const toolStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderStyle}>
      <Stack.Screen
        name={RouteNames.Tools}
        component={Tools}
        options={{
          title: "Tools",
          headerLeft: openDrawerButton,
        }}
      />
    </Stack.Navigator>
  );
};

export default toolStack;
