import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {navigate} from "./RootNavigation";
import RouteNames from "./RouteNames";
import {defaultDP} from "../constants/appConstants";
import React from "react";
import {spacing} from "../constants/dimension";
import NotificationList from "../components/NotificationList";

const RightHeader = (props) => {
  const {userData} = props;
  return (
    <View style={styles.row}>
      <NotificationList/>
      <TouchableOpacity
        onPress={() => {
          navigate(RouteNames.MyProfile);
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
    </View>
  );
};

const styles = StyleSheet.create({
  imageHeader: {
    height: 28,
    width: 28,
    borderRadius: 20
  },
  rightMargin: {
    marginRight: spacing.medium
  },
  row: {
    flexDirection: 'row',
    alignItems:'center'
  }
});
export default RightHeader;