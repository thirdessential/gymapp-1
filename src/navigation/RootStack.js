import React from "react";

import RouteNames from "./RouteNames";
import Stack from './stacks/stack';
import AppTabNavigator from "./AppTabNavigator";
import MyProfile from "../screens/App/MyProfile";
import openDrawerButton from "./openDrawerButton";
import {defaultHeaderStyle} from "../constants/styles";
import PreferenceSwiper from "../screens/App/Preference/PreferenceSwiper";
import PostViewer from "../screens/Social/PostViewer";
import Enroll from "../screens/App/User/Enroll";
import Payment from "../screens/App/User/Payment";
import PackagesView from "../screens/App/User/PackagesView";
import CreatePost from "../screens/Social/CreatePost";
import CallRequests from "../screens/App/Trainer/CallRequests";
import PackageList from "../screens/App/Trainer/PackageList";
import PackageEdit from "../screens/App/Trainer/PackageEdit";
import SlotsView from "../screens/App/Trainer/Subscriptions";
import Profile from "../screens/App/Profile";
import BMI from "../screens/Fitness/BMI";
import Speech from "../screens/App/Speech";
import CouponMachine from "../screens/App/Trainer/CouponMachine";
import AccountDash from "../screens/App/Trainer/AccountDash";
import {appTheme} from "../constants/colors";
import AccountStatement from "../screens/App/Trainer/AccountStatement";
import AddAccount from "../screens/App/Trainer/AddAccount";
import StreamScreen from "../screens/Social/StreamScreen";
import ShowStreamVideo from "../screens/Social/ShowStreamVideo";
import SelectExercise from "../screens/Fitness/SelectExercise";
import Exercises from "../screens/Fitness/Exercises";
import PerformExercise from "../screens/Fitness/PerformExercise";
import PerformStretch from "../screens/Fitness/PerformStretch";
import LiveScheduler from "../screens/Social/LiveScheduler";
import store from "../store/configureStore";
import {userTypes} from "../constants/appConstants";
import MyStreams from "../screens/Social/MyStreams";
import strings from "../constants/strings";
import Water from "../screens/Fitness/Water";

const rootStack = () => {
  let {userType} = store.getState().user;
  const isTrainer = userType === userTypes.TRAINER;
  return (
    <Stack.Navigator screenOptions={defaultHeaderStyle}>
      <Stack.Screen name={RouteNames.RootTab} component={AppTabNavigator} options={{title: '', headerShown: false,}}/>
      <Stack.Screen
        name={RouteNames.MyProfile}
        component={MyProfile}
        options={{
          title: '',
          headerTransparent: true,
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
      {
        !isTrainer && ( // User specific screens
          <>
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
          </>
        )
      }
      {
        isTrainer && ( // Trainer specific screens
          <>
            <Stack.Screen
              name={RouteNames.CallRequests}
              component={CallRequests}
              options={{
                title: "Call Requests",
              }}
            />
            <Stack.Screen
              name={RouteNames.Packages}
              component={PackageList}
              options={{
                title: "My Packages",
              }}
            />
            <Stack.Screen
              name={RouteNames.PackageEdit}
              component={PackageEdit}
              options={{title: "", headerTransparent: true}}
            />
            <Stack.Screen
              name={RouteNames.CouponMachine}
              component={CouponMachine}
              options={{
                title: "Coupons",
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
              name={RouteNames.LiveScheduler}
              component={LiveScheduler}
              options={{
                title: "",
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name={RouteNames.MyStreams}
              component={MyStreams}
              options={{
                title: strings.MY_LIVE_STREAMS,
              }}
            />
          </>
        )
      }
      <Stack.Screen
        name={RouteNames.PostViewer}
        component={PostViewer}
        options={{
          title: 'Comments',
        }}/>
      <Stack.Screen
        name={RouteNames.CreatePost}
        component={CreatePost}
        options={{
          title: 'Create post',
        }}/>


      <Stack.Screen
        name={RouteNames.SubscriptionsView}
        component={SlotsView}
        options={{
          title: "My Clients",
        }}
      />
      <Stack.Screen
        name={RouteNames.Profile}
        component={Profile}
        options={{title: "", headerTransparent: true}}
      />
      <Stack.Screen
        name={RouteNames.BMI}
        component={BMI}
        options={{
          title: "BMI",
        }}
      />
      <Stack.Screen
        name={RouteNames.Water}
        component={Water}
        options={{
          title: "Water",
        }}
      />
      <Stack.Screen
        name={RouteNames.Speech}
        component={Speech}
        options={{
          title: "Speech",
        }}
      />
      <Stack.Screen
        name={RouteNames.StreamScreen}
        component={StreamScreen}
        options={{
          title: "Stream",
        }}
      />
      <Stack.Screen
        name={RouteNames.ShowStreamVideo}
        component={ShowStreamVideo}
        options={{
          title: "See videos",
          headerTintColor: appTheme.darkBackground,
          headerStyle: {
            backgroundColor: appTheme.brightContent,
          },
        }}
      />
      <Stack.Screen
        name={RouteNames.SelectExercise}
        component={SelectExercise}
        options={{
          title: "Exercise",
          headerTintColor: appTheme.darkBackground,
          headerStyle: {
            backgroundColor: appTheme.brightContent,
          },
        }}
      />
      <Stack.Screen
        name={RouteNames.Exercises}
        component={Exercises}
        options={{
          title: "Exercises",
          headerTintColor: appTheme.darkBackground,
          headerStyle: {
            backgroundColor: appTheme.brightContent,
          },
        }}
      />
      <Stack.Screen
        name={RouteNames.PerformExercise}
        component={PerformExercise}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name={RouteNames.PerformStretch}
        component={PerformStretch}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

export default rootStack;