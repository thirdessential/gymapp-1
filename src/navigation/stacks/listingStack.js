import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";
import Profile from "../../screens/App/Profile";
import Enroll from "../../screens/App/User/Enroll";
import UserListing from "../../screens/App/UserListing";
import openDrawerButton from "../openDrawerButton";
import store from "../../store/configureStore";
import {userTypes} from "../../constants/appConstants";
import Payment from "../../screens/App/User/Payment";
import PackagesView from "../../screens/App/User/PackagesView";
import {defaultHeaderStyle} from "../../constants/styles";

const listing = (props) => {
  const userData = store.getState().user.userData;
  let {userType} = userData;
  const listingTitle = userType === userTypes.USER ? 'Trainers' : 'Users';

  return (
    <Stack.Navigator screenOptions={defaultHeaderStyle}>
      <Stack.Screen
        name={RouteNames.UserListing}
        component={UserListing}
        options={{
          title: listingTitle,
          headerLeft: openDrawerButton
        }}/>
      <Stack.Screen
        name={RouteNames.Profile} component={Profile}
        options={{title: '', headerTransparent: true}}/>
      <Stack.Screen
        name={RouteNames.Enroll} component={Enroll}
        options={{
          title: 'Slots',
        }}/>
      <Stack.Screen
        name={RouteNames.Payment}
        component={Payment}
        options={{
          title: 'Complete Payment',
        }}/>
      <Stack.Screen
        name={RouteNames.PackagesView}
        component={PackagesView}
        options={{
          title: 'Packages',
        }}/>
    </Stack.Navigator>
  );
}

export default listing;