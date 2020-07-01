import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

import CoreApp from '../stacks/coreAppStack';
import {signOutFirebase} from "../../API/firebaseMethods";
import {appTheme} from "../../constants/colors";
import PackageStack from '../stacks/PackageStack';
import SlotList from "../../screens/App/SlotList";
import CustomDrawerContent from "./drawerContent";
import ProfileEdit from "../../screens/App/ProfileEdit";
import store from '../../store/configureStore';
import {userTypes} from "../../constants/appConstants";

const Drawer = createDrawerNavigator();
const MyTheme = {
  colors: {
    primary: appTheme.darkBackground,
  },
};
const rootDrawer = (props) => {
  const {navigationRef, userType} = props;
  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      <Drawer.Navigator initialRouteName="Home"
                        drawerType={'slide'}
                        drawerContent={CustomDrawerContent}
      >
        <Drawer.Screen name="Home" component={CoreApp}/>
        <Drawer.Screen name="Edit Profile" component={ProfileEdit}/>
        {
          userType === userTypes.TRAINER && (
            <Drawer.Screen name="My Packages" component={PackageStack}/>
          )
        }
        {
          userType === userTypes.TRAINER && (
            <Drawer.Screen name="Edit Slots" component={SlotList}/>
          )
        }
      </Drawer.Navigator>
    </NavigationContainer>
  );
}




export default rootDrawer;

