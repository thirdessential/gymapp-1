import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";
import {appTheme} from "../../constants/colors";
import fonts from "../../constants/fonts";
import openDrawerButton from "../openDrawerButton";
import SlotList from "../../screens/App/Trainer/SlotList";

const slotEdit = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteNames.SlotEdit}
        component={SlotList}
        options={{
          title: 'My Slots',
          headerTintColor: appTheme.brightContent,
          headerStyle: {
            backgroundColor: appTheme.darkBackground,
          },
          headerTitleStyle:{
            fontFamily: fonts.PoppinsRegular
          },
          headerLeft: openDrawerButton

        }}/>
    </Stack.Navigator>
  );
}

export default slotEdit;