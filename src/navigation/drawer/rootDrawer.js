import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

import CoreApp from '../stacks/coreAppStack';
import Settings from "../../screens/App/Settings";
import {signOutFirebase} from "../../API/firebaseMethods";

const Drawer = createDrawerNavigator();

const rootDrawer = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator initialRouteName="Home"
                        drawerType={'slide'}
                        drawerContent={CustomDrawerContent}
      >
        <Drawer.Screen name="Home" component={CoreApp}/>
        <Drawer.Screen name="Settings" component={Settings}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/*<DrawerItem*/}
      {/*  label="Sign Out"*/}
      {/*  onPress={() => signOutFirebase()}*/}
      {/*/>*/}
    </DrawerContentScrollView>
  );
}

export default rootDrawer;

