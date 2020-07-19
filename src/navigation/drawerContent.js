import {
  DrawerContentScrollView, DrawerItemList, DrawerItem
} from "@react-navigation/drawer";
import {appTheme, darkPallet} from "../constants/colors";
import {StyleSheet, Text, View} from "react-native";
import * as React from "react";
import store from '../store/configureStore';
import Avatar from "../components/Avatar";
import {spacing} from "../constants/dimension";
import fonts from "../constants/fonts";
import {signOutUser} from "../store/actions/user.actions";
import {defaultDP, userTypes} from "../constants/appConstants";
import RouteNames from "./RouteNames";
import LinearGradient from "react-native-linear-gradient";
import {drawerLabelStyle} from "../constants/styles";

function CustomDrawerContent(props) {
  const {userData, userType} = props;
  let name, displayPictureUrl;
  if (!userData) {
    name = 'User';
    displayPictureUrl = defaultDP;
  } else {
    name = userData.name;
    displayPictureUrl = userData.displayPictureUrl;
  }
  if (!displayPictureUrl) displayPictureUrl = defaultDP
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: appTheme.darkBackground, marginTop: -spacing.small}}>
      <LinearGradient
        colors={[darkPallet.lightBlue, darkPallet.extraDarkBlue]}
      >
        <View style={styles.container}>
          <Avatar url={displayPictureUrl}/>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{name}</Text>
          </View>
        </View>
        <View style={styles.list}>
          <DrawerItemList {...props} labelStyle={{color: 'white'}}/>
          <DrawerItem
            label="Edit Profile"
            labelStyle={drawerLabelStyle}
            onPress={() => props.navigation.navigate(RouteNames.ProfileEdit)}
          />
          <DrawerItem
            label="Appointments"
            labelStyle={drawerLabelStyle}
            onPress={() => props.navigation.navigate(RouteNames.MyAppointments)}
          />
          <DrawerItem
            label="Subscriptions"
            labelStyle={drawerLabelStyle}
            onPress={() => {
              if (userType === userTypes.TRAINER)
                props.navigation.navigate(RouteNames.Subscriptions);
                else props.navigation.navigate(RouteNames.SlotsView);
            }}
          />
          {
            userType === userTypes.USER && (
              <DrawerItem
                label="Schedule"
                labelStyle={drawerLabelStyle}
                onPress={() => props.navigation.navigate(RouteNames.Schedule)}
              />
            )
          }
          {
            userType === userTypes.TRAINER && (
              <DrawerItem
                label="My Packages"
                labelStyle={drawerLabelStyle}
                onPress={() => props.navigation.navigate(RouteNames.Packages)}
              />
            )
          }
          {
            userType === userTypes.TRAINER && (
              <DrawerItem
                label="My Slots"
                labelStyle={drawerLabelStyle}
                onPress={() => props.navigation.navigate(RouteNames.SlotsView)}
              />
            )
          }
          {
            __DEV__?
              <DrawerItem
                label="Sign Out"
                labelStyle={drawerLabelStyle}
                onPress={() => store.dispatch(signOutUser())}
              />:null
          }
        </View>
      </LinearGradient>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.thumbnailMini,
    marginBottom: spacing.large_lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: spacing.medium_sm
  },
  title: {
    color: appTheme.brightContent,
    fontFamily: fonts.MontserratMedium,
    fontSize: 18,
  },
  list: {
    marginLeft: spacing.small
  }
});


export default CustomDrawerContent;