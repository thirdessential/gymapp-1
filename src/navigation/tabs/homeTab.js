import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";

import UserListing from "../../screens/App/UserListing";
import RouteNames from "../RouteNames";
import colors, {appTheme} from "../../constants/colors";
import Feed from "../../screens/App/Feed";

const Tab = createMaterialTopTabNavigator();

const homeTab = () => {
  return (
    <Tab.Navigator
      tabBarPosition={'bottom'}
      tabBarOptions={{
        activeTintColor: colors.appBlue,
        inactiveTintColor: 'gray',
        showIcon: true,
        showLabel: false,
        style: { backgroundColor:appTheme.darkGrey },
      }}
    >
      <Tab.Screen
        name={RouteNames.UserListing}
        component={UserListing}
        options={{
          title: 'Listing',
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'ios-list-box' : 'ios-list';
            return <Ionicons name={iconName} size={20} color={color}/>;
          },
        }}/>
      <Tab.Screen
        name={RouteNames.Feed}
        component={Feed}
        options={{
          title: 'Feed',
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'ios-people' : 'ios-people';
            return <Ionicons name={iconName} size={20} color={color}/>;
          },
        }}
      />
    </Tab.Navigator>
  );
}
export default homeTab;