import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import {spacing} from "../../constants/dimension";

const authBar = (props) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={props.googleLogin}
        style={[styles.button, styles.leftButton]}
      >
        <Icon
          name="google-"
          color="white"
          size={35}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={props.facebookLogin}
        style={[styles.button, styles.rightButton]}
      >
        <Icon
          name="facebook"
          color="white"
          size={35}
        />
      </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1
  },
  button: {
    borderRadius: 40,
    padding: spacing.medium_sm,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  leftButton: {
    backgroundColor: '#c33a09',
    // borderTopRightRadius: 0,
    // borderBottomRightRadius: 0
  },
  rightButton: {
    backgroundColor: '#3b5998',
    marginLeft: 2,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
});

export default authBar;