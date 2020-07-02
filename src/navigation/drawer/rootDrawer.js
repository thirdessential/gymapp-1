import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';


import CoreApp from '../stacks/coreAppStack';
import {appTheme} from "../../constants/colors";
import PackageStack from '../stacks/PackageStack';
import CustomDrawerContent from "./drawerContent";
import ProfileEdit from "../../screens/App/ProfileEdit";
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}




export default rootDrawer;

