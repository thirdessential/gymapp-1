/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types';
import {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import fontSizes from "../constants/fontSizes";
import fonts from "../constants/fonts";

const selectableButton = (props) => {
  const {textContent, selected, activeStyle, textStyle, disabled} = props;

  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.7} id={Math.random()} {...props} >
      {
        selected && (
          <View
            style={[styles.container, {backgroundColor: appTheme.brightContent}, activeStyle]}>
            <Text style={[styles.textContentStyle, textStyle]}>{textContent}</Text>
          </View>
        )
      }
      {
        !selected && (
          <View style={styles.container}>
            <Text style={styles.textContentStyle}>{textContent}</Text>
          </View>
        )
      }
    </TouchableOpacity>
  );
}

selectableButton.propTypes = {
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: spacing.medium_sm,
    paddingRight: spacing.medium_sm,
    paddingTop: spacing.small,
    paddingBottom: spacing.small_sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  textContentStyle: {
    color: appTheme.textPrimary,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fontSizes.h2
  }
});

export default React.memo(selectableButton);