import React from "react";
import {StyleSheet, Text, TouchableOpacity,} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import fontSizes from "../constants/fontSizes";
import fonts from "../constants/fonts";

const halfRoundedButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.8} style={styles.createButton}>
      <FontAwesome
        name={'plus'}
        color={'#444'}
        size={15}
      />
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: appTheme.brightContent,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.small
  },
  buttonText: {
    color: 'white',
    fontSize: fontSizes.h4,
    fontFamily: fonts.CenturyGothic,
    marginLeft: spacing.small_sm,
    marginRight: spacing.small_sm
  }
});

export default React.memo(halfRoundedButton);