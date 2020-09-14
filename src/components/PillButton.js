import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

import {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import fonts from "../constants/fonts";

const pillButton = (props) => (
  <TouchableOpacity disabled={props.disabled} onPress={props.onPress}
                    style={[styles.pillButton, props.disabled ? styles.disabled : null, {backgroundColor: props.tint}]}>
    <Text style={[styles.buttonText, props.bold ? {fontWeight: '700'} : null]}>{props.title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  pillButton: {
    backgroundColor: appTheme.brightContent,
    paddingLeft: spacing.medium_sm,
    paddingRight: spacing.medium_sm,
    padding: spacing.small_sm,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabled: {
    backgroundColor: appTheme.grey
  },
  buttonText: {
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothic
  }
});

export default pillButton;