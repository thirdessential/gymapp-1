import React from "react";

import Stack from "./stack";
import RouteNames from "../RouteNames";
import {appTheme} from "../../constants/colors";
import openDrawerButton, {openDrawerButtonDark} from "../openDrawerButton";

import Tools from "../../screens/App/Tools";
import CallRequests from "../../screens/App/Trainer/CallRequests";
import PackageList from "../../screens/App/Trainer/PackageList";
import PackageEdit from "../../screens/App/Trainer/PackageEdit";
import SlotsView from "../../screens/App/Trainer/SlotsView";
import TrainerSubscriptions from "../../screens/App/Trainer/Subscriptions";
import Profile from "../../screens/App/Profile";
import BMI from "../../screens/App/BMI";
import CouponMachine from "../../screens/App/Trainer/CouponMachine";
import AccountStatement from "../../screens/App/Trainer/AccountStatement";
import AccountDash from "../../screens/App/Trainer/AccountDash";
import AddAccount from "../../screens/App/Trainer/AddAccount";
import PreferenceSwiper from "../../screens/App/Preference/PreferenceSwiper";
import {defaultHeaderStyle} from "../../constants/styles";
// import BrowseSlots from "../../screens/App/User/BrowseSlots";
// import strings from "../../constants/strings";

const toolStack = () => {
  return (
    <Stack.Navigator screenOptions={defaultHeaderStyle}>
      <Stack.Screen
        name={RouteNames.Tools}
        component={Tools}
        options={{
          title: 'Tools',
          headerLeft: openDrawerButton
        }}
      />
      <Stack.Screen
        name={RouteNames.CallRequests}
        component={CallRequests}
        options={{
          title: 'Call Requests',
        }}
      />
      <Stack.Screen
        name={RouteNames.Packages}
        component={PackageList}
        options={{
          title: 'My Packages',
        }}
      />
      <Stack.Screen
        name={RouteNames.PackageEdit}
        component={PackageEdit}
        options={{title: '', headerTransparent: true}}
      />
      <Stack.Screen
        name={RouteNames.SlotsView}
        component={SlotsView}
        options={{
          title: 'Slots',
        }}
      />
      <Stack.Screen
        name={RouteNames.Subscriptions}
        component={TrainerSubscriptions}
        options={{
          title: 'Subscriptions',
        }}
      />
      {/*<Stack.Screen*/}
      {/*  name={RouteNames.BrowseSlots}*/}
      {/*  component={BrowseSlots}*/}
      {/*  options={{*/}
      {/*    title: strings.BROWSE_SLOTS,*/}
      {/*  }}*/}
      {/*/>*/}
      <Stack.Screen
        name={RouteNames.Profile}
        component={Profile}
        options={{title: '', headerTransparent: true}}
      />
      <Stack.Screen
        name={RouteNames.BMI}
        component={BMI}
        options={{
          title: 'BMI',
        }}
      />
      <Stack.Screen
        name={RouteNames.CouponMachine}
        component={CouponMachine}
        options={{
          title: 'Coupons',
        }}
      />
      <Stack.Screen
        name={RouteNames.AccountDash}
        component={AccountDash}
        options={{
          title: "Dashboard",
          headerTintColor: appTheme.darkBackground,
          headerStyle: {
            backgroundColor: appTheme.brightContent,
          },
        }}
      />
      <Stack.Screen
        name={RouteNames.AccountStatement}
        component={AccountStatement}
        options={{
          title: "Account Statement",
          headerTintColor: appTheme.darkBackground,
          headerStyle: {
            backgroundColor: appTheme.brightContent,
          },
        }}
      />
      <Stack.Screen
        name={RouteNames.AddAccount}
        component={AddAccount}
        options={{
          title: "Add Account",
        }}
      />
      <Stack.Screen
        name={RouteNames.ProfileEdit}
        component={PreferenceSwiper}
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default toolStack;
