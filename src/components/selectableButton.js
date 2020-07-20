/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types';
import colors, {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import fontSizes from "../constants/fontSizes";

const selectableButton = (props) => {
  const {textContent, selected, activeStyle, textStyle, disabled} = props;

  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.7}  {...props} >
      {
        selected && (
          <View
            style={[styles.container,{backgroundColor:appTheme.brightContent}, activeStyle ]}>
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
  // textContent: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: spacing.medium_sm,
    paddingRight: spacing.medium_sm,
    paddingTop: spacing.small,
    paddingBottom: spacing.small_sm,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 6,
  },
  textContentStyle: {
    color: 'white',
    fontFamily:'Poppins-SemiBold',
    fontSize:fontSizes.h2
  }
});

export default React.memo(selectableButton);