import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";
import {appTheme} from "../../constants/colors";
import fonts from "../../constants/fonts";
import openDrawerButton from "../openDrawerButton";
import SlotList from "../../screens/App/Trainer/SlotList";
import Schedule from "../../screens/App/User/Schedule";

const schedule = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteNames.SlotEdit}
        component={Schedule}
        options={{
          headerTintColor: appTheme.brightContent,
          headerTransparent: true,
          headerLeft: openDrawerButton,
          title:''
        }}/>
    </Stack.Navigator>
  );
}

export default schedule;