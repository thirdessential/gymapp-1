import React from "react";

import Stack from "./stack";
import RouteNames from "../RouteNames";
import {defaultHeaderStyle} from "../../constants/styles";
import Exercises from "../../screens/Fitness/Exercises";
import openDrawerButton from "../openDrawerButton";
import NotificationList from "../../components/NotificationList";

const workoutStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderStyle}>
      <Stack.Screen
        name={RouteNames.Exercises}
        component={Exercises}
        options={{
          title: "Workout",
          headerLeft: openDrawerButton,
          headerRight: ()=><NotificationList/>
        }}
      />
    </Stack.Navigator>
  );
};

export default workoutStack;
