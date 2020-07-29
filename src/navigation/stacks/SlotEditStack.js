import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";
import openDrawerButton from "../openDrawerButton";
import SlotList from "../../screens/App/Trainer/SlotList";
import {defaultHeaderStyle} from "../../constants/styles";

const slotEdit = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderStyle}>
    <Stack.Screen
        name={RouteNames.SlotEdit}
        component={SlotList}
        options={{
          title: 'My Slots',
          headerLeft: openDrawerButton
        }}/>
    </Stack.Navigator>
  );
}

export default slotEdit;