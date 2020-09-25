import {
  DrawerContentScrollView, DrawerItemList, DrawerItem
} from "@react-navigation/drawer";
import {appTheme, darkPallet} from "../constants/colors";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/MaterialIcons";

function CustomDrawerContent(props) {
  const {userData, userType, newCallbacks} = props;
  let name, displayPictureUrl;
  if (!userData) {
    name = 'User';
    displayPictureUrl = defaultDP;
  } else {
    name = userData.name;
    displayPictureUrl = userData.displayPictureUrl;
  }
  if (!displayPictureUrl) displayPictureUrl = defaultDP;
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
      <LinearGradient
        colors={[darkPallet.lightBlue, darkPallet.extraDarkBlue]}>
        <TouchableOpacity onPress={() => props.navigation.navigate(RouteNames.MyProfile)} style={styles.container}>
          <Avatar url={displayPictureUrl}/>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{name}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.list}>
          <View  style={styles.requestContainer}>
            <Icon name="home" color="white" size={22}/>
            <DrawerItemList {...props} labelStyle={{color: 'white'}}/>
          </View>
          <View  style={styles.requestContainer}>
            <Icon name="face" color="white" size={22}/>
            <DrawerItem
            label="Profile"
            labelStyle={drawerLabelStyle}
            onPress={() => props.navigation.navigate(RouteNames.MyProfile)}
          />
          </View>
      
         
          {
            userType === userTypes.TRAINER && (
              <View style={styles.requestContainer}>
                <Icon name="call" color="white" size={22}/>
                <DrawerItem
                  label="Call Requests"
                  labelStyle={drawerLabelStyle}
                  onPress={() => {
                    props.navigation.navigate(RouteNames.CallRequests);
                  }}
                />
                {newCallbacks &&
                <Entypo name={'dot-single'} color={appTheme.brightContent} size={30}
                        style={{marginLeft: -spacing.large_lg}}/>
                }
              </View>
            )
          }
          {
            userType === userTypes.TRAINER && (
              <View  style={styles.requestContainer}>
                <Icon name="dashboard" color="white" size={22}/>
                <DrawerItem
                  label="My Packages"
                  labelStyle={drawerLabelStyle}
                  onPress={() => props.navigation.navigate(RouteNames.Packages)}
                />
              </View>
            )
          }
             <View  style={styles.requestContainer}>
                <Icon name="person" color="white" size={22}/>
                <DrawerItem
                  label={userType === userTypes.TRAINER ? "My Clients" : "Subscriptions "}
                  labelStyle={drawerLabelStyle}
                  onPress={() => props.navigation.navigate(RouteNames.SubscriptionsView)}
                />
              </View>
          
          {/*Experimental signout functionality. Never use in production. Firebase has some bugs */}
          {
            __DEV__ ?
            <View  style={styles.requestContainer}>
            <Icon name="input" color="white" size={22}/>
            <DrawerItem
                label="Sign Out"
                labelStyle={drawerLabelStyle}
                onPress={() => store.dispatch(signOutUser())}
              />
          </View>
               : null
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
  },
  requestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  drawerContainer: {
    backgroundColor: appTheme.darkBackground,
    marginTop: -spacing.small
  }
});


export default CustomDrawerContent;