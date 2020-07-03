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

const Tab = createMaterialTopTabNavigator();

const homeTab = (props) => {
  const userData = store.getState().user.userData;
  let {userType} = userData;
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
      {
        userType === userTypes.TRAINER && (
          <Tab.Screen
            name={RouteNames.Packages}
            component={PackageStack}
            options={{
              title: 'Packages',
              tabBarIcon: ({focused, color, size}) => {
                let iconName = focused ? 'ios-construct' : 'ios-construct';
                return <Ionicons name={iconName} size={20} color={color}/>;
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
              title: 'Packages',
              tabBarIcon: ({focused, color, size}) => {
                let iconName = focused ? 'list' : 'list';
                return <FontAwesome name={iconName} size={20} color={color}/>;
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
                return <FontAwesome name={iconName} size={20} color={color}/>;
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
            return <Ionicons name={iconName} size={20} color={color}/>;
          },
        }}
      />
    </Tab.Navigator>
  );
}
export default homeTab;