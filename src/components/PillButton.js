import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import fonts from "../constants/fonts";


const pillButton = (props) => (
  <TouchableOpacity onPress={props.onPress} style={styles.pillButton}>
    <Text style={styles.buttonText}>{props.title}</Text>
  </TouchableOpacity>
)


const styles = StyleSheet.create({

  pillButton: {
    backgroundColor: appTheme.brightContent,
    paddingLeft: spacing.medium_sm,
    paddingRight: spacing.medium_sm,
    padding: spacing.small_sm,
    borderRadius: 100
  },
  buttonText: {
    color: 'white',
    fontFamily: fonts.CenturyGothic
  }
});

export default pillButton;