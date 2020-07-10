/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import colors, {appTheme} from "../constants/colors";
import {StyleSheet, View} from "react-native";
import {Card, Text} from 'native-base';
import Avatar from "./Avatar";
import {spacing} from "../constants/dimension";

import fontSizes from "../constants/fontSizes";

const activityComponent = (props) => {
  return (
    <Card style={styles.cardStyle}>
      <View style={styles.container}>
        <Avatar
          size={70}
          border={true}
          rounded={false}
          url={props.imageUrl}
        />
        <View style={styles.appointmentDetails}>
          <Text style={styles.displayName}>{props.displayName}</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.timeText}>{props.day}, {props.time}</Text>
            <FontAwesome color={appTheme.grey} size={fontSizes.h2} style={{paddingTop:2, paddingLeft:spacing.small}} name={'clock-o'}/>
          </View>
          <Text style={styles.timeText}>{props.type}</Text>
        </View>

      </View>
    </Card>
  );
}

activityComponent.propTypes = {};

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 6,
    backgroundColor: appTheme.darkBackground,
    borderColor: appTheme.darkBackground,
    elevation: 11,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing.medium_sm,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
  },
  appointmentDetails: {
    paddingLeft: spacing.medium
  },
  displayName: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold'
  },
  timeText: {
    color: appTheme.grey,
    fontSize: fontSizes.h3,
    fontFamily: 'Poppins-Medium',
  },
});

export default activityComponent;