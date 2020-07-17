import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import store from '../store/configureStore';

import RouteNames from "./RouteNames";
import colors, {appTheme} from "../constants/colors";
import Schedule from "../screens/App/User/Schedule";
import Profile from "../screens/App/Profile";
import MyProfileStack from './stacks/myProfileStack';
import PackageStack from "./stacks/PackageStack";
import {userTypes} from "../constants/appConstants";
import {ActivityIndicator, Text, View} from "react-native";
import fontSizes from "../constants/fontSizes";
import ListingStack from './stacks/listingStack';
import SlotEditStack from "./stacks/SlotEditStack";
import ActivityStack from "./stacks/ActivityStack";
import SocialStack from "./stacks/SocialStack";
import ToolStack from "./stacks/ToolStack";

const Tab = createMaterialTopTabNavigator();

// const bgView = () => (
//   <View style={{backgroundColor: appTheme.darkBackground, flex: 1, justifyContent:'center',alignItems:'center'}}>
//     <ActivityIndicator size={40} color={appTheme.lightContent}/>
//   </View>)
// ;

const appTabNavigator = (props) => {
  let {userType} = store.getState().user;
  const listingTitle = userType === userTypes.USER ? 'Trainers' : 'Users';
  return (
    <Tab.Navigator
      // lazy={true}
      // lazyPreloadDistance={1}
      // lazyPlaceholder={bgView}
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
        style: {backgroundColor: appTheme.darkGrey},
      }}
    >
      <Tab.Screen
        name={RouteNames.ActivityTab}
        component={ActivityStack}
        options={{
          title: 'Activity',
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'activity' : 'activity';
            return <View style={{alignItems: 'center'}}><Feather name={iconName} size={20} color={color}/></View>
          },
        }}/>
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
      {
        userType === userTypes.USER && (
          <Tab.Screen
            name={RouteNames.UserListing}
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
      {
        userType === userTypes.TRAINER && (
          <Tab.Screen
            name={RouteNames.SlotEdit}
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

      <Tab.Screen
        name={RouteNames.MyProfile}
        component={MyProfileStack}
        options={{
          title: 'Profile',
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'md-person' : 'md-person';
            return <View style={{alignItems: 'center'}}><Ionicons name={iconName} size={20} color={color}/></View>
          },
        }}
      />
    </Tab.Navigator>
  );
}
export default appTabNavigator;