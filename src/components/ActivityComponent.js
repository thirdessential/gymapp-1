/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import colors, {appTheme} from "../constants/colors";
import {StyleSheet, View} from "react-native";
import {Text} from 'native-base';
import Avatar from "./Avatar";
import {spacing} from "../constants/dimension";

import fontSizes from "../constants/fontSizes";
import fonts from "../constants/fonts";

const activityComponent = (props) => {
  return (
    <View style={styles.container}>
        <Avatar
          size={60}
          border={true}
          rounded={false}
          url={props.imageUrl}
        />
        <Text style={styles.displayName}>{props.type} with {props.displayName}</Text>
        <View style={styles.appointmentDetails}>
        </View>
    </View>
  );
}

activityComponent.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%'
  },
  appointmentDetails: {
    paddingLeft: spacing.medium,
    justifyContent: 'flex-start',
  },
  displayName: {
    color: 'white',
    fontFamily: fonts.PoppinsRegular,
    marginBottom: spacing.small,
    marginLeft: spacing.medium,
    flex: 1,
    flexWrap: 'wrap'
  },
  timeText: {
    color: appTheme.grey,
    fontSize: fontSizes.h3,
    fontFamily: 'Poppins-Medium',
  },
});

export default React.memo(activityComponent);