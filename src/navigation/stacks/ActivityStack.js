import React, { Component } from "react";
import { connect } from "react-redux";
import Stack from "./stack";
import RouteNames from "../RouteNames";
import openDrawerButton from "../openDrawerButton";
import { appTheme } from "../../constants/colors";
import Activity from "../../screens/App/Activity";

import {spacing} from "../../constants/dimension";

import { defaultHeaderStyle } from "../../constants/styles";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import Feather from "react-native-vector-icons/Feather";
import Dash from "react-native-dash";
import { defaultDP, userTypes } from "../../constants/appConstants";
import {
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Alert,
  Text,
  FlatList,
} from "react-native";

import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
const data = [
  {
    text: "Jinit booked your slot on 9PM",
    id: "1",
  },
  {
    text: "Jinit booked your slot on 9PM",
    id: "2",
  },
  {
    text: "Jinit booked your slot on 9PM",
    id: "3",
  },
  {
    text: "Jinit booked your slot on 9PM",
    id: "4",
  },
  {
    text: "Jinit booked your slot on 9PM",
    id: "5",
  },
  {
    text: "Jinit booked your slot on 9PM",
    id: "6",
  },
];

class activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      all: false,
    };
  }
  profileHeader = () => {
    const { userData } = this.props;
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate(RouteNames.MyProfile);
          }}
        >
          <View style={styles.rightMargin}>
            <Image
              source={{
                uri: userData.displayPictureUrl || defaultDP,
              }}
              style={styles.imageHeader}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };
  render() {
    return (
      <Stack.Navigator screenOptions={defaultHeaderStyle}>
        <Stack.Screen
          name={RouteNames.Activity}
          component={Activity}
          options={{
            title: "Activity",
            headerLeft: openDrawerButton,
            headerRight: this.profileHeader,
            // headerRight: () => (
            //   <Menu>
            //     <MenuTrigger style={{marginRight: 10}}>
            //       <Feather
            //         name="bell"
            //         color={appTheme.brightContent}
            //         size={30}
            //       />
            //       <View style={styles.bellIcon}>
            //         <Text style={{color: appTheme.brightContent}}>
            //           {this.state.data.length}
            //         </Text>
            //       </View>
            //     </MenuTrigger>
            //     <MenuOptions
            //       customStyles={{
            //         backgroundColor: appTheme.darkBackground,
            //         flex: 1,
            //       }}
            //       optionsContainerStyle={{width: 250, marginTop: 10}}
            //     >
            //       <FlatList
            //         data={
            //           this.state.all
            //             ? this.state.data
            //             : this.state.data.slice(0, 4)
            //         }
            //         style={{width: "100%"}}
            //         renderItem={({item}) => (
            //           <>
            //             <MenuOption
            //               style={{
            //                 flexDirection: "row",
            //                 backgroundColor: appTheme.background,
            //               }}
            //             >
            //               <Image
            //                 source={{
            //                   uri:
            //                     "https://avatars0.githubusercontent.com/u/49580371?s=460&u=74f444710198d10f41e44f01637c3de3529db178&v=4",
            //                 }}
            //                 style={{
            //                   height: 30,
            //                   width: 30,
            //                   borderRadius: 20,
            //                   marginTop: 5,
            //                 }}
            //                 resizeMode={"contain"}
            //               />
            //               <Text style={styles.text}>{item.text}</Text>
            //             </MenuOption>
            //             <Dash
            //               style={{width: "100%"}}
            //               dashGap={0.1}
            //               dashColor={appTheme.brightContent}
            //               dashThickness={0.8}
            //             />
            //           </>
            //         )}
            //         keyExtractor={(item) => item.id}
            //       />
            //       <MenuOption
            //         style={{
            //           flexDirection: "row",
            //           backgroundColor: appTheme.background,
            //
            //           justifyContent: "center",
            //         }}
            //       >
            //         {!this.state.all && (
            //           <Text
            //             style={styles.showOrHide}
            //             onPress={() => {
            //               this.setState({all: !this.state.all});
            //             }}
            //           >
            //             View all notifications
            //           </Text>
            //         )}
            //         {this.state.all && (
            //           <Text
            //             style={styles.showOrHide}
            //             onPress={() => {
            //               this.setState({all: !this.state.all});
            //             }}
            //           >
            //             Show recent
            //           </Text>
            //         )}
            //       </MenuOption>
            //     </MenuOptions>
            //   </Menu>
            // ),
          }}
        />
      </Stack.Navigator>
    );
  }
}
const styles = StyleSheet.create({
  // menuButton: ,
  // menuText: ,
  text: {
    marginLeft: spacing.medium_sm,
    color: appTheme.greyC,
    fontFamily: fonts.CenturyGothic,
    fontSize: fontSizes.h2,
    marginRight: 20,
  },
  showOrHide: {
    marginLeft: spacing.medium_sm,
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothic,
    fontSize: fontSizes.h3,
  },
  bellIcon: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginLeft: -5,
    marginTop: -5,
    backgroundColor: "white",
    borderRadius: 20,
    height: 20,
    width: 20,
  },
  imageHeader: { height: 30, width: 30, borderRadius: 20 },
  rightMargin:{
    marginRight: spacing.medium
  }
});
const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(activity);
