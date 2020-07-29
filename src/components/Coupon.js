/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import colors, {appTheme} from "../constants/colors";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Card, Text} from 'native-base';
import Avatar from "./Avatar";
import {spacing} from "../constants/dimension";
import GenericButton from "./GenericButton";
import SelectableButton from "./selectableButton";
import strings from "../constants/strings";
import CallButton from "./CallButton";
import fontSizes from "../constants/fontSizes";
import fonts from "../constants/fonts";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {contentItem, roundEdgeSeparator} from "./Trainer/StatementCard";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const shareFab = (onPress) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={styles.fab}>
    <FontAwesome5Icon name={'share-alt'} color={appTheme.textPrimary} size={24}/>
  </TouchableOpacity>
)

const coupon = (props) => {
  return (
    <View style={styles.cardStyle}>
      <View style={styles.row}>
        {contentItem(strings.DISCOUNT, props.discount + ' %')}
        {contentItem(strings.REDEEMED, `(${props.redeemed}/${props.count})`, true)}
      </View>
      <View style={[styles.row, {marginTop:spacing.medium, marginBottom:spacing.small}]}>
        <Text style={styles.brightTitle}>{strings.VALID_UPTO}</Text>
        <Text style={styles.title}>—</Text>
        <Text style={styles.brightTitle}>{props.validity}</Text>
      </View>
      {roundEdgeSeparator()}
      <View style={[styles.row, {marginVertical: spacing.small}]}>
        <Text style={[styles.brightTitle, {color: appTheme.altBrightContent}]}>{strings.COUPON_CODE}</Text>
        <Text style={[styles.brightTitle, {color: appTheme.textPrimary}]}>{props.code}</Text>
      </View>
      {roundEdgeSeparator()}
      <View style={styles.row}>
        <Text style={styles.subtitle}>{props.onShare? strings.SHARE_COUPON: strings.COUPON_EXHAUSTED}</Text>
        {
          props.onShare && (
            <View style={styles.fabPosition}>
              {shareFab(props.onShare)}
            </View>
          )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 20,
    backgroundColor: appTheme.background,
    borderColor: appTheme.background,
    elevation: 11,
    alignItems: 'center',
    padding: spacing.medium_sm,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.medium_sm,
    width: '100%'
  },
  subtitle: {
    color: appTheme.grey,
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothic,
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
  fab: {
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appTheme.brightContent
  },
  fabPosition:{
    marginBottom:-25 - spacing.medium_sm,
  }
});

export default React.memo(coupon);