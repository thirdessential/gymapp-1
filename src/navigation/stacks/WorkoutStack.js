import React from "react";

import Stack from "./stack";
import RouteNames from "../RouteNames";
import {appTheme} from "../../constants/colors";
import {defaultHeaderStyle} from "../../constants/styles";
import Exercises from "../../screens/Fitness/Exercises";
import openDrawerButton from "../openDrawerButton";

const workoutStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderStyle}>
      <Stack.Screen
        name={RouteNames.Exercises}
        component={Exercises}
        options={{
          title: "Workout",
          headerLeft: openDrawerButton,
        }}
      />
    </Stack.Navigator>
  );
};

export default workoutStack;
