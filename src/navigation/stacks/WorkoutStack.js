import React from "react";

import Stack from "./stack";
import RouteNames from "../RouteNames";
import {defaultHeaderStyle} from "../../constants/styles";
import Exercises from "../../screens/Fitness/Exercises";
import openDrawerButton from "../openDrawerButton";
import RightHeader from "../RightHeader";

const workoutStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderStyle}>
      <Stack.Screen
        name={RouteNames.Exercises}
        component={Exercises}
        options={{
          title: "Workout",
          headerLeft: openDrawerButton,
          headerRight: () => <RightHeader userData={this.props.userData}/>
        }}
      />
    </Stack.Navigator>
  );
};

export default workoutStack;
