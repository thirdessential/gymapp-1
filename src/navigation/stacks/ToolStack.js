import React from "react";

import Stack from './stack';
import RouteNames from "../RouteNames";
import {appTheme} from "../../constants/colors";
import openDrawerButton from "../openDrawerButton";
import fonts from "../../constants/fonts";
import Tools from "../../screens/App/Tools";
import MyAppointments from "../../screens/App/MyAppointments";
import PackageList from "../../screens/App/Trainer/PackageList";
import PackageEdit from "../../screens/App/Trainer/PackageEdit";
import SlotsView from "../../screens/App/Trainer/SlotsView";
import TrainerSubscriptions from "../../screens/App/Trainer/Subscriptions";
import Schedule from "../../screens/App/User/Schedule";
import Profile from "../../screens/App/Profile";
import BMI from "../../screens/App/BMI";
import CouponMachine from "../../screens/App/Trainer/CouponMachine";

const toolStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteNames.Tools}
        component={Tools}
        options={{
          title: 'Tools',
          headerTintColor: appTheme.brightContent,
          headerStyle: {
            backgroundColor: appTheme.darkBackground,
          },
          headerTitleStyle: {
            fontFamily: fonts.PoppinsRegular
          },
          headerLeft: openDrawerButton
        }}
      />
      <Stack.Screen
        name={RouteNames.MyAppointments}
        component={MyAppointments}
        options={{
          title: 'Appointments',
          headerTintColor: appTheme.brightContent,
          headerStyle: {
            backgroundColor: appTheme.darkBackground,
          },
          headerTitleStyle: {
            fontFamily: fonts.PoppinsRegular
          },
        }}
      />
      <Stack.Screen
        name={RouteNames.Packages}
        component={PackageList}
        options={{
          title: 'My Packages',
          headerTintColor: appTheme.brightContent,
          headerStyle: {
            backgroundColor: appTheme.darkBackground,
          },
          headerTitleStyle: {
            fontFamily: fonts.PoppinsRegular
          }
        }}
      />
      <Stack.Screen
        name={RouteNames.PackageEdit}
        component={PackageEdit}
        options={{title: '', headerTintColor: appTheme.brightContent, headerTransparent: true}}
      />
      <Stack.Screen
        name={RouteNames.SlotsView}
        component={SlotsView}
        options={{
          title: 'Slots',
          headerTintColor: appTheme.brightContent,
          headerStyle: {
            backgroundColor: appTheme.darkBackground,
          },
          headerTitleStyle: {
            fontFamily: fonts.PoppinsRegular
          }
        }}
      />
      <Stack.Screen
        name={RouteNames.Subscriptions}
        component={TrainerSubscriptions}
        options={{
          title: 'Subscriptions',
          headerTintColor: appTheme.brightContent,
          headerStyle: {
            backgroundColor: appTheme.darkBackground,
          },
          headerTitleStyle: {
            fontFamily: fonts.PoppinsRegular
          }
        }}
      />
      <Stack.Screen
        name={RouteNames.Schedule}
        component={Schedule}
        options={{
          title: 'Schedule',
          headerTintColor: appTheme.brightContent,
          headerStyle: {
            backgroundColor: appTheme.darkBackground,
          },
          headerTitleStyle: {
            fontFamily: fonts.PoppinsRegular
          }
        }}
      />
      <Stack.Screen name={RouteNames.Profile} component={Profile}
                    options={{title: '', headerTintColor: appTheme.brightContent, headerTransparent: true}}/>
      <Stack.Screen
        name={RouteNames.BMI}
        component={BMI}
        options={{
          title: 'BMI',
          headerTintColor: appTheme.brightContent,
          headerStyle: {
            backgroundColor: appTheme.darkBackground,
          },
          headerTitleStyle: {
            fontFamily: fonts.PoppinsRegular
          }
        }}
      />
      <Stack.Screen
        name={RouteNames.CouponMachine}
        component={CouponMachine}
        options={{
          title: 'Coupons',
          headerTintColor: appTheme.brightContent,
          headerStyle: {
            backgroundColor: appTheme.darkBackground,
          },
          headerTitleStyle: {
            fontFamily: fonts.PoppinsRegular
          }
        }}
      />
    </Stack.Navigator>
  )
}

export default toolStack;