/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, View} from "react-native";

import {spacing} from "../constants/dimension";
import {
  defaultDP,
  MS_IN_DAY,
  sessionStatus,
  streamText,
  subscriptionType,
  subscriptionTypeNames
} from "../constants/appConstants";
import {appTheme, bmiColors} from "../constants/colors";
import fontSizes from "../constants/fontSizes";
import fonts from "../constants/fonts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {formatSeconds} from "../utils/utils";
import Ion from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import strings from "../constants/strings";

const todaySession = (props) => {

  return (
    <View style={styles.container}>
      <View style={styles.content}>
          <Text style={styles.title}>{strings.TODAY_WORKOUT}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    elevation: 4,
    backgroundColor: appTheme.darkBackground,
    padding: spacing.large,
    borderRadius: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: spacing.thumbnail,
    width: spacing.thumbnail,
    borderRadius: 15,
    elevation: 4
  },
  content: {
    marginRight: spacing.medium,
    justifyContent: 'space-between',
    flex: 1
  },
  title: {
    fontSize: fontSizes.bigTitle,
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothicBold,
    marginBottom: spacing.small_sm
  },
  subtitle: {
    fontSize: fontSizes.h3,
    color: bmiColors.blue,
    fontFamily: fonts.CenturyGothic,
  },
  statusContainer: {
    marginLeft: 'auto',
    borderRadius: 5,
    borderWidth: 0.6,
    padding: spacing.small,
    paddingVertical: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0
  },
  status: {
    fontSize: fontSizes.h5,
    fontFamily: fonts.PoppinsRegular,
  }
});

export default React.memo(todaySession);