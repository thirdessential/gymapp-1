/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from "react-native";

import {spacing} from "../constants/dimension";
import {defaultDP} from "../constants/appConstants";
import {appTheme} from "../constants/colors";
import fontSizes from "../constants/fontSizes";

const Avatar = (props) => {
  const {url, size = spacing.thumbnail, roundedMultiplier = 8, badge = false} = props;
  const imageStyle = {
    height: size,
    width: size,
    borderRadius: size / roundedMultiplier,
  }
  return (
    <View>
      <FastImage
        style={imageStyle}
        source={{
          uri: !!url ? url : defaultDP,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      {
        badge && (
          <Text style={[styles.badge, {
            backgroundColor: badge.backgroundColor,
            color: badge.textColor
          }]}>
            {badge.display}
          </Text>
        )
      }
    </View>
  );
}

Avatar.propTypes = {
  url: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  url: defaultDP // fallback url
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: appTheme.brightContent,
    borderRadius: 100,
    padding: 1,
    paddingHorizontal: spacing.small,
    fontSize: fontSizes.h5,
    color: appTheme.textPrimary,
    textAlign: 'center',
    marginTop: spacing.small_sm,
  },
});

export default React.memo(Avatar);