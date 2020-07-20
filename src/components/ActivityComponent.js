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
      <View style={styles.details}>
        <Avatar
          size={60}
          border={true}
          rounded={false}
          url={props.imageUrl}
        />
        <Text style={styles.displayName}>{props.type} with {props.displayName}</Text>
        <View style={styles.appointmentDetails}>
          {/*<View style={{flexDirection:'row'}}>*/}
          {/*  <Text style={styles.timeText}>{props.day}, {props.time}</Text>*/}
          {/*</View>*/}
        </View>
      </View>


    </View>
  );
}

activityComponent.propTypes = {};

const styles = StyleSheet.create({

  container: {
    width: '100%'
  },
  details: {
    flexDirection: 'row'
  },
  appointmentDetails: {
    paddingLeft: spacing.medium,
    justifyContent: 'flex-start',
    // width:'100%'
  },
  displayName: {
    color: 'white',
    fontFamily: fonts.PoppinsRegular,
    marginBottom: spacing.small,
    marginTop: -spacing.small,
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