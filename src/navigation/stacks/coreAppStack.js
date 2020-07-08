// import React from "react";
//
// import Stack from './stack';
// import RouteNames from "../RouteNames";
// import Profile from "../../screens/App/Profile";
//
// import VideoCall from "../../screens/Call/VideoCall";
// import HomeTab from '../tabs/appTabNavigator';
// import Schedule from "../../screens/App/Schedule";
//
// import {appTheme} from "../../constants/colors";
// import { TouchableOpacity, View} from "react-native";
// import FontAwesome from "react-native-vector-icons/Feather";
// import {spacing} from "../../constants/dimension";
// import {openDrawer} from "../RootNavigation";
//
// import Enroll from "../../screens/App/Enroll";
// import fonts from "../../constants/fonts";
//
// const noHeader = {title: '', headerStyle: {height: 0}}
//
// const openDrawerButton = () => (
//   <TouchableOpacity onPress={openDrawer} style={{marginLeft: spacing.medium_lg, marginRight: 0}}>
//     <FontAwesome
//       name={'menu'}
//       color={appTheme.brightContent}
//       size={20}
//     />
//   </TouchableOpacity>
// )
//
// const coreApplication = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name={RouteNames.HomeTab} component={HomeTab} options={{
//         // title: '',
//         headerTintColor: appTheme.brightContent,
//         headerStyle: {
//           backgroundColor: appTheme.darkBackground,
//         },
//         headerTitleStyle:{
//           // color:'white'
//           fontFamily: fonts.PoppinsRegular
//         },
//         // headerTransparent:true,
//         headerLeft: openDrawerButton
//       }}/>
//       <Stack.Screen name={RouteNames.Profile} component={Profile}
//                     options={{title: '', headerTintColor: appTheme.brightContent, headerTransparent: true}}/>
//       <Stack.Screen name={RouteNames.Enroll} component={Enroll}
//                     options={{title: '', headerTintColor: appTheme.brightContent, headerTransparent: true}}/>
//       <Stack.Screen
//         name={RouteNames.VideoCall}
//         component={VideoCall}
//         options={{
//           headerTransparent: true,
//           headerLeft: () => null,
//           title:''
//         }}/>
//       <Stack.Screen name={RouteNames.Schedule} component={Schedule} options={{title: '', headerTransparent: true}}/>
//     </Stack.Navigator>
//   );
// }
//
// export default coreApplication;