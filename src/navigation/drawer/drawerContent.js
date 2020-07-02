import {DrawerContentScrollView, DrawerItemList,  DrawerItem
} from "@react-navigation/drawer";
import {appTheme} from "../../constants/colors";
import {StyleSheet, Text, View} from "react-native";
import * as React from "react";
import store from '../../store/configureStore';
import Avatar from "../../components/Avatar";
import {spacing} from "../../constants/dimension";
import fonts from "../../constants/fonts";
import {signOutUser} from "../../store/actions/user.actions";
import {userTypes} from "../../constants/appConstants";
import RouteNames from "../RouteNames";
const defaultDP = 'https://media.istockphoto.com/photos/middle-aged-gym-coach-picture-id475467038';

function CustomDrawerContent(props) {
  const userData = store.getState().user.userData;
  let {name='',displayPictureUrl, userType} = userData;
  if(!displayPictureUrl) displayPictureUrl = defaultDP
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: appTheme.background}}>
      <View style={styles.container}>
        <Avatar url={displayPictureUrl} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>
      <DrawerItemList {...props} labelStyle={{color: 'white'}}/>
      {
        userType===userTypes.TRAINER && (
          <DrawerItem
            label="My Packages"
            labelStyle={{color: 'white'}}
            onPress={() => props.navigation.navigate(RouteNames.Packages)}
          />
        )
      }
      {
        userType===userTypes.TRAINER && (
          <DrawerItem
            label="My Slots"
            labelStyle={{color: 'white'}}
            onPress={() => props.navigation.navigate(RouteNames.SlotEdit)}
          />
        )
      }
      <DrawerItem
        label="Sign Out"
        labelStyle={{color: 'white'}}
        onPress={() => store.dispatch(signOutUser())}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:spacing.thumbnailMini,
    marginBottom:spacing.large_lg,
    justifyContent:'center',
    alignItems:'center'
  },
  titleContainer:{
    marginTop:spacing.medium_sm
  },
  title: {
    color: 'white',
    fontFamily:fonts.MontserratMedium,
    fontSize: 18,
  },
});


export default CustomDrawerContent;