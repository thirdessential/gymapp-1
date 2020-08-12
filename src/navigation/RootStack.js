import React from "react";

import RouteNames from "./RouteNames";
import Stack from './stacks/stack';
import AppTabNavigator from "./AppTabNavigator";

const rootStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name={RouteNames.RootTab} component={AppTabNavigator} options={{title: ''}}/>
    </Stack.Navigator>
  );
}

export default rootStack;