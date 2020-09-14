import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import store from '../store/configureStore';

import RouteNames from "./RouteNames";
import {appTheme} from "../constants/colors";
import {userTypes} from "../constants/appConstants";
import {ActivityIndicator, View} from "react-native";
import fontSizes from "../constants/fontSizes";
import ListingStack from './stacks/listingStack';
import SlotEditStack from "./stacks/SlotEditStack";
import ActivityStack from "./stacks/ActivityStack";
import SocialStack from "./stacks/SocialStack";
import ToolStack from "./stacks/ToolStack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import WorkoutStack from "./stacks/WorkoutStack";
import strings from "../constants/strings";

const Tab = createMaterialTopTabNavigator();

// Loader component for when lazy rendering is enabled, always enabled in dev mode for speed
const bgView = () => (
  <View style={{backgroundColor: appTheme.darkBackground, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size={40} color={appTheme.lightContent}/>
  </View>
);
const lazyConfig = __DEV__ ? {lazy: true, lazyPreloadDistance: 0, lazyPlaceholder: bgView} : {}

const appTabNavigator = (props) => {
  let {userType} = store.getState().user;
  const listingTitle = userType === userTypes.USER ? strings.TRAINERS : strings.USERS;
  return (
    <Tab.Navigator
      swipeEnabled={false}
      {...lazyConfig}
      backBehavior={'initialRoute'}
      tabBarPosition={'bottom'}
      tabBarOptions={{
        activeTintColor: appTheme.brightContent,
        inactiveTintColor: 'gray',
        showIcon: true,
        labelStyle: {
          fontSize: fontSizes.h5,
          padding: 0,
          margin: 0,
        },
        tabStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3
        },
        style: {backgroundColor: appTheme.darkBackground},
      }}
    >
      {/*User activity*/}
      <Tab.Screen
        name={RouteNames.ActivityTab}
        component={ActivityStack} // edit this screen and replace with any temporary screen for faster testing
        options={{
          title: 'Activity',
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'activity' : 'activity';
            return <View style={{alignItems: 'center'}}><Feather name={iconName} size={20} color={color}/></View>
          },
        }}/>
      {/*Community Tab*/}
      <Tab.Screen
        name={RouteNames.SocialTab}
        component={SocialStack}
        options={{
          title: 'Community',
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'feed' : 'feed';
            return <View style={{alignItems: 'center'}}><FontAwesome name={iconName} size={20} color={color}/></View>
          },
        }}/>
      {/*Trainer Listing*/}
      {
        userType === userTypes.USER && (
          <Tab.Screen
            name={RouteNames.ListingTab}
            component={ListingStack}
            options={{
              title: listingTitle,
              tabBarIcon: ({focused, color, size}) => {
                let iconName = focused ? 'ios-people' : 'ios-people';
                return <View style={{alignItems: 'center'}}><Ionicons name={iconName} size={20} color={color}/></View>
              },
            }}/>
        )
      }
      {/*Slot edit screen for trainer*/}
      {
        userType === userTypes.TRAINER && (
          <Tab.Screen
            name={RouteNames.SlotEditTab}
            component={SlotEditStack}
            options={{
              title: 'Slots',
              tabBarIcon: ({focused, color, size}) => {
                let iconName = focused ? 'list' : 'list';
                return <View style={{alignItems: 'center'}}><FontAwesome name={iconName} size={20}
                                                                         color={color}/></View>
              },
            }}/>
        )
      }
      {/*Workout module*/}
      <Tab.Screen
        name={RouteNames.WorkoutTab}
        component={WorkoutStack}
        options={{
          title: 'Workout',
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'dumbbell' : 'dumbbell';
            return (
              <View style={{alignItems: 'center'}}>
                <MaterialCommunityIcons name={iconName} size={20} color={color}/>
              </View>);
          },
        }}/>
      {/*Misc Tools*/}
      <Tab.Screen
        name={RouteNames.ToolTab}
        component={ToolStack}
        options={{
          title: 'Tools',
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'ios-construct' : 'ios-construct';
            return (
              <View style={{alignItems: 'center'}}><Ionicons name={iconName} size={20} color={color}/></View>);
          },
        }}/>
    </Tab.Navigator>
  );
}
export default appTabNavigator;