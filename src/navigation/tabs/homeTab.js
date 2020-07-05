import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import store from '../../store/configureStore';

import UserListing from "../../screens/App/UserListing";
import RouteNames from "../RouteNames";
import colors, {appTheme} from "../../constants/colors";
import Feed from "../../screens/App/Feed";
import Schedule from "../../screens/App/Schedule";
import Profile from "../../screens/App/Profile";
import MyProfileStack from '../stacks/myProfileStack';
import PackageStack from "../stacks/PackageStack";
import {userTypes} from "../../constants/appConstants";
import SlotList from "../../screens/App/SlotList";
import {ActivityIndicator, Text, View} from "react-native";
import fontSizes from "../../constants/fontSizes";

const Tab = createMaterialTopTabNavigator();

// const bgView = () => (
//   <View style={{backgroundColor: appTheme.darkBackground, flex: 1, justifyContent:'center',alignItems:'center'}}>
//     <ActivityIndicator size={40} color={appTheme.lightContent}/>
//   </View>)
// ;

const homeTab = (props) => {
  const userData = store.getState().user.userData;
  let {userType} = userData;
  const listingTitle = userType === userTypes.USER ? 'Trainers' : 'Users';
  return (
    <Tab.Navigator
      // lazy={true}
      // lazyPreloadDistance={1}
      // lazyPlaceholder={bgView}
      tabBarPosition={'bottom'}
      tabBarOptions={{
        activeTintColor: colors.appBlue,
        inactiveTintColor: 'gray',
        showIcon: true,
        // showLabel: false,
        labelStyle: {
          // color:'red'
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
        name={RouteNames.UserListing}
        component={UserListing}
        options={{
          title: listingTitle,
          tabBarIcon: ({focused, color, size}) => {
            let iconName = focused ? 'ios-list-box' : 'ios-list';
            return <View style={{alignItems: 'center'}}><Ionicons name={iconName} size={20} color={color}/></View>

          },
        }}/>
      {
        userType === userTypes.TRAINER && (
          <Tab.Screen
            name={RouteNames.Packages}
            component={PackageStack}
            options={{
              title: 'Packages',
              tabBarIcon: ({focused, color, size}) => {
                let iconName = focused ? 'ios-construct' : 'ios-construct';
                return (<View style={{alignItems: 'center'}}><Ionicons name={iconName} size={20} color={color}/></View>);
              },
            }}/>
        )
      }
      {
        userType === userTypes.TRAINER && (
          <Tab.Screen
            name={RouteNames.SlotEdit}
            component={SlotList}
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
      {
        userType === userTypes.USER && (
          <Tab.Screen
            name={RouteNames.Schedule}
            component={Schedule}
            options={{
              title: 'Schedule',
              tabBarIcon: ({focused, color, size}) => {
                let iconName = focused ? 'calendar-o' : 'calendar';
                return <View style={{alignItems: 'center'}}><FontAwesome name={iconName} size={20}
                                                                         color={color}/></View>
              },
            }}/>
        )
      }

      {/*<Tab.Screen*/}
      {/*  name={RouteNames.Feed}*/}
      {/*  component={Feed}*/}
      {/*  options={{*/}
      {/*    title: 'Feed',*/}
      {/*    tabBarIcon: ({focused, color, size}) => {*/}
      {/*      let iconName = focused ? 'table' : 'table';*/}
      {/*      return <FontAwesome name={iconName} size={20} color={color}/>;*/}
      {/*    },*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<Tab.Screen*/}
      {/*  name={RouteNames.MyClients}*/}
      {/*  component={MyClients}*/}
      {/*  options={{*/}
      {/*    title: 'My Clients',*/}
      {/*    tabBarIcon: ({focused, color, size}) => {*/}
      {/*      let iconName = focused ? 'eye' : 'eye';*/}
      {/*      return <FontAwesome name={iconName} size={20} color={color}/>;*/}
      {/*    },*/}
      {/*  }}*/}
      {/*/>*/}
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
export default homeTab;