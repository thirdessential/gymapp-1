/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, { useState } from 'react';
import { ImageBackground, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

import strings from "../../constants/strings";
import { spacing } from "../../constants/dimension";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import { getRandomImage } from "../../constants/images";
import colors, { appTheme } from "../../constants/colors";
import { hitSlop20 } from "../../constants/styles";
import { packageImages, packageTypes } from "../../constants/appConstants";
import { militaryTimeToString, toTitleCase } from '../../utils/utils'
const toggleAnimation = (callback, value) => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  callback(value)
}

const PackageOverview = (props) => {
  const { open = false } = props;
  const [collapsed, setCollapsed] = useState(!open);
  const chevron = !collapsed ? 'chevron-up' : 'chevron-down';
  const [imageSrc] = useState(getRandomImage());
  const { days, time } = props.slot
  console.log(new Date(time),"time")
  const today = new Date().toLocaleDateString();
  const endDate = new Date();
  const estWeeks = Math.floor(props.sessionCount / days.length);
  endDate.setDate(endDate.getDate() + estWeeks * 7);
  const EditButtons = () => (
    <View style={styles.editContainer}>
      <TouchableOpacity
        style={styles.enrollButton}
        onPress={props.editCallback}
        hitSlop={hitSlop20}
      >
        <Entypo
          name={'edit'}
          color={'white'}
          size={24}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginLeft: spacing.medium }} onPress={props.deleteCallback}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <FontAwesome
          name={'trash'}
          color={colors.rejectRed}
          size={25}
        />
      </TouchableOpacity>
    </View>
  )

  const renderContent = () => {
     if (collapsed)
      return null;
    else return (
      <View style={styles.textContainer}>
        <Text style={styles.description}>{props.description}</Text>
        {/* <Text style={styles.description}>{packageTypes[props.category]}</Text> */}
        {
          props.group && (
            <View style={styles.daysContainer}>
               <Text style={styles.dayBox}>

              {days.map((day, i) => {
                return (
                  // <View key={i}>
                  // <Text style={styles.dayBox}>
                  toTitleCase(day) + `${i == days.length - 1 ? "" : "|"}`
                  // </Text>
                  // </View>
                  )
                })}
                </Text>
            </View>
          )
        }
      </View>
    )
  }
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => toggleAnimation(setCollapsed, !collapsed)}>
      <ImageBackground
        style={styles.container}
        blurRadius={2}
        borderRadius={12}
        source={packageImages[props.category] || imageSrc}>
        <View style={[styles.textContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          <Text style={styles.title}>{props.title}</Text>
          <View style={{ flexDirection: 'row', marginTop: spacing.small }}>
            <FontAwesome
              name={props.group ? 'group' : 'user'}
              color={appTheme.textPrimary}
              size={12}
              style={{ marginRight: spacing.small_lg }}
            />
            <FontAwesome
              name={chevron}
              color={appTheme.textPrimary}
              size={12}
            />
          </View>
        </View>
        <Text
          style={styles.description}>{props.totalSubscriptions} {props.totalSubscriptions === 1 ? strings.SUBSCRIPTION : strings.SUBSCRIPTIONS}</Text>
        {
          props.group && (
            <View>
        <Text style={styles.description}>
          {strings.TIMING}: {militaryTimeToString(time)}
        </Text>
        <Text style={styles.description}>
          {strings.DATE}: {today} - {endDate.toLocaleDateString()}
        </Text>
        </View>
          )
        }
        {renderContent()}
        <Text style={styles.description}>{props.group ? strings.GROUP_PACKAGE : strings.SINGLE_PACKAGE}</Text>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{props.sessionCount} {strings.SESSIONS}</Text>

          <Text style={styles.price}>{strings.RUPEE} {props.price}</Text>
          {
            props.enrollCallback && !collapsed && (
              <TouchableOpacity style={styles.enrollButton} onPress={props.enrollCallback}>
                <Text style={styles.enroll}>{strings.ENROLL}</Text>
              </TouchableOpacity>
            )
          }
          {
            props.editCallback && !collapsed && (
              <EditButtons />
            )
          }

        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

PackageOverview.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  callback: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    borderRadius: 12,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
  },
  textContainer: {
    marginBottom: spacing.medium_sm
  },
  title: {
    color: appTheme.textPrimary,
    fontFamily: fonts.RobotoRegular,
    fontSize: fontSizes.h0
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subtitle: {
    color: appTheme.textPrimary,
    fontFamily: fonts.RobotoRegular,
    fontSize: fontSizes.h2
  },
  price: {
    color: appTheme.textPrimary,
    fontFamily: fonts.RobotoBold,
    fontSize: fontSizes.h1
  },
  description: {
    color: appTheme.textPrimary,
    fontFamily: fonts.RobotoRegular,
    fontSize: fontSizes.h2
  },
  enroll: {
    color: appTheme.textPrimary,
    fontFamily: fonts.RobotoBold,
    fontSize: fontSizes.h1
  },
  editContainer: {
    flexDirection: 'row'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detail: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothic,
    marginBottom: spacing.small_sm,
    fontWeight: "bold"
  },
  dayBox: {
    padding: spacing.small,
    backgroundColor: appTheme.textPrimary,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: appTheme.brightContent,
    fontFamily: fonts.Monospace,
    fontWeight: "bold",
    fontSize: fontSizes.h4,
    textAlign: "center",
    marginRight: spacing.small,
  },
  daysContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: spacing.small,
    marginBottom: spacing.medium,
  }
});

export default React.memo(PackageOverview);