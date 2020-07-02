import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";

import PackageEdit from "../../screens/App/PackageEdit";
import PackageList from "../../screens/App/PackageList";

const myPackages = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name={RouteNames.Packages} component={PackageList}/>
      <Stack.Screen name={RouteNames.PackageEdit} component={PackageEdit}/>
    </Stack.Navigator>
  )
}

export default myPackages;