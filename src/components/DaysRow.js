/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from "react";
import {StyleSheet, Text, View} from 'react-native'
import {toTitleCase} from "../utils/utils";
import {WEEK_DAYS} from "../constants/appConstants";
import {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import fontSizes from "../constants/fontSizes";
import fonts from "../constants/fonts";

const daysRow = ({activeDays=[]}) => {
  const renderDay = (title) => {
    const inactiveStyle = activeDays.includes(title) ? styles.inactive:{};
    return (
      <View key={title} style={styles.card}>
        <Text style={[styles.title, inactiveStyle]}>{toTitleCase(title)}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {Object.keys(WEEK_DAYS).map(day => renderDay(day))}
    </View>
  )
}

daysRow.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    backgroundColor: appTheme.background,
    padding: spacing.small_lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  title: {
    fontSize: fontSizes.h4,
    fontFamily:fonts.Monospace,
    fontWeight: 'bold',
    color: appTheme.brightContent
  },
  inactive: {
    color: appTheme.darkBackground
  }
});

export default React.memo(daysRow);