import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";
import UserListing from "../../screens/App/UserListing";
import openDrawerButton from "../openDrawerButton";
import store from "../../store/configureStore";
import {userTypes} from "../../constants/appConstants";
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
    </Stack.Navigator>
  );
}

export default listing;