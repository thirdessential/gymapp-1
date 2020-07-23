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

const coupon = (props) => {
  return (
    <View style={styles.cardStyle}>
      <View style={styles.row}>
        <Text style={styles.subtitle}>{strings.COUPON_CODE}</Text>
        <TouchableOpacity onPress={props.onShare} style={{flexDirection: 'row'}}>
          <Text style={styles.subtitle}>{props.code}</Text>
          <FontAwesome
            name={'share-alt'}
            color={styles.subtitle.color}
            size={20}
            style={{marginLeft: spacing.small_lg}}/>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitle}>{strings.DISCOUNT}</Text>
        <Text style={styles.subtitle}>{props.discount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitle}>{strings.VALIDITY}</Text>
        <Text style={styles.subtitle}>{props.validity}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitle}>{strings.REDEEMED}</Text>
        <Text style={styles.subtitle}>{props.redeemed}/{props.count}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 6,
    backgroundColor: appTheme.darkBackground,
    borderColor: appTheme.background,
    elevation: 11,
    alignItems: 'center',
    padding: spacing.medium_sm,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 270,
    marginBottom: spacing.medium_sm
  },
  title: {
    color: 'white',
    fontFamily: fonts.CenturyGothicBold
  },
  subtitle: {
    color: appTheme.grey,
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothic,
  },
});

export default React.memo(coupon);