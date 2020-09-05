import React, {Component} from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import {connect} from "react-redux";

import Stack from "./stack";
import RouteNames from "../RouteNames";
import openDrawerButton from "../openDrawerButton";
import Activity from "../../screens/App/Activity";
import {spacing} from "../../constants/dimension";
import {defaultHeaderStyle} from "../../constants/styles";
import {defaultDP} from "../../constants/appConstants";
import NotificationList from "../../components/NotificationList";
import Sessions from "../../screens/App/Sessions";

class activity extends Component {

  profileHeader = () => {
    const {userData} = this.props;
    return (
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
            // headerRight: this.profileHeader,
            headerRight: ()=><NotificationList/>
          }}
        />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  imageHeader: {height: 30, width: 30, borderRadius: 20},
  rightMargin: {
    marginRight: spacing.medium
  }
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(activity);
