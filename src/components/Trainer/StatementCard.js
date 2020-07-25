/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Dash from 'react-native-dash';

import {spacing} from "../../constants/dimension";
import {appTheme} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import {toTitleCase} from "../../utils/utils";

export const contentItem = (title, content, alignRight = false) => (
  <View>
    <Text style={[styles.subtitle, alignRight && {textAlign: 'right'}]}>{title}</Text>
    <Text style={[styles.title, alignRight && {textAlign: 'right'}]}>{content}</Text>
  </View>
)
export const separator = () => (
  <Dash
    dashColor={appTheme.greyC}
    dashThickness={1} dashLength={5} dashGap={3}
    style={{height: 1, marginVertical: spacing.medium_sm}}/>
)

export const roundEdgeSeparator = (color = appTheme.darkBackground) => (
  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    <View
      style={{height: 30, width: 30, borderRadius: 20, backgroundColor: color, marginLeft: -43}}/>
    <View style={{width: '100%'}}>
      {separator()}
    </View>
    <View
      style={{height: 30, width: 30, borderRadius: 20, backgroundColor: color, marginRight: -43}}/>
  </View>
)

const statement = (props) => {
  const {couponDetails, userDetails, packageDetails, transactionDetails} = props;

  return (
    <View style={styles.container}>
      <View style={[styles.row, {marginBottom: spacing.medium}]}>
        {contentItem(strings.PACKAGE, packageDetails.packageTitle)}
        {contentItem(strings.SESSIONS, packageDetails.sessionStatus, true)}
      </View>
      <View style={[styles.row, {marginBottom: spacing.medium}]}>
        <Text style={styles.brightTitle}>{new Date(packageDetails.startDate).toLocaleDateString()}</Text>
        <Text style={styles.title}>—</Text>
        <Text style={styles.brightTitle}>{new Date(packageDetails.endDate).toLocaleDateString()}</Text>
      </View>
      {
        couponDetails && (
          <>
            {roundEdgeSeparator()}
            <View style={[styles.row, {marginVertical: spacing.medium}]}>
              <Text style={[styles.brightTitle, {color: appTheme.altBrightContent}]}>{strings.COUPON_APPLIED}</Text>
              <Text style={[styles.brightTitle, {color: appTheme.textPrimary}]}>{couponDetails.couponCode}</Text>
            </View>
          </>
        )
      }

      {roundEdgeSeparator()}
      <View style={[styles.row, {marginBottom: spacing.medium, marginTop: spacing.medium_sm}]}>
        {contentItem(strings.USER_NAME, userDetails.userName)}
        {contentItem(strings.CITY, userDetails.userCity, true)}
      </View>
      {separator()}
      <Text style={[styles.subtitle, {
        textAlign: 'center',
        marginVertical: spacing.small,
        marginBottom: spacing.small_lg
      }]}>{strings.TRANSACTION_DETAILS}</Text>
      <View style={styles.row}>
        <Text style={styles.subtitleBold}>{strings.TRANSACTION_STATUS}</Text>
        <Text
          style={[styles.subtitleBold, {color: appTheme.altBrightContent}]}>{toTitleCase(transactionDetails.status)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitleBold}>{strings.PACKAGE_PRICE}</Text>
        <Text style={styles.subtitleBold}>{transactionDetails.packagePrice} INR</Text>
      </View>
      {
        couponDetails && (
          <>
            <View style={styles.row}>
              <Text style={styles.subtitleBold}>{strings.DISCOUNT}</Text>
              <Text style={[styles.subtitleBold, {color: appTheme.brightContent}]}>{couponDetails.discount}%</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subtitleBold}>{strings.FINAL_AMOUNT}</Text>
              <Text style={[styles.subtitleBold, {color: appTheme.brightContent}]}>{couponDetails.finalPrice} INR</Text>
            </View>
          </>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.background,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: 20,
    elevation: 7
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subtitle: {
    color: appTheme.greyC,
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothic,
    marginBottom: spacing.small_sm
  },
  subtitleBold: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothicBold,
    marginBottom: spacing.small_sm
  },
  title: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothicBold
  },
  brightTitle: {
    color: appTheme.brightContent,
    fontSize: fontSizes.h2,
    fontFamily: fonts.CenturyGothicBold
  },
  separator: {
    borderStyle: 'dashed',
    borderBottomWidth: 0,
    borderWidth: 1,
    borderColor: appTheme.greyC,
    borderRadius: 1,
  }

});

export default React.memo(statement);