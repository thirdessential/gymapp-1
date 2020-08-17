/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ImageBackground, TouchableNativeFeedback} from "react-native";

import {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import strings from "../../constants/strings";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {getRandomImage} from "../../constants/images";
import {screenWidth} from "../../utils/screenDimensions";
import {streamStatus, streamStatusColor} from "../../constants/appConstants";
import {formattedDayDate, formattedTime, toTitleCase} from "../../utils/utils";
import Avatar from "../Avatar";

const streamCard = ({title, status, duration, date, host, onJoin}) => {
  const [bgSource] = useState(getRandomImage);
  return (
    <TouchableOpacity disabled={status === streamStatus.SCHEDULED} onPress={onJoin} activeOpacity={0.7}>
      <ImageBackground
        blurRadius={5}
        borderRadius={14}
        style={styles.container}
        source={bgSource}>
        <View style={[styles.statusButton, {backgroundColor: streamStatusColor[status]}]}>
          <Text style={styles.subHeading}>{status}</Text>
        </View>
        <View style={styles.mainContent}>
          <Text style={styles.heading}>{toTitleCase(title)}</Text>
          <Text style={styles.subHeading}>{formattedDayDate(date)}</Text>
          <Text style={styles.subHeading}>{formattedTime(date)}, {duration} {strings.MINUTES}</Text>
        </View>
        <View style={styles.leftContent}>
          <Avatar url={host.displayPictureUrl} size={40} roundedMultiplier={1}/>
          <View style={styles.leftMargin}>
            <Text style={styles.subHeadingLight}>{host.name}</Text>
            {!!host.city && <Text style={[styles.subHeadingLight, {fontSize: fontSizes.h4}]}>{host.city}</Text>}
          </View>
        </View>
        <View style={styles.rightContent}>

        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 210,
    elevation: 5,
    width: screenWidth,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.medium
  },
  heading: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsSemiBold,
    textAlign: 'center'
  },
  subHeading: {
    color: appTheme.greyC,
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothicBold,
    textAlign: 'center'
  },
  subHeadingLight: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h2,
    fontFamily: fonts.CenturyGothic,
  },
  statusButton: {
    borderRadius: 2,
    elevation: 2,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small_sm,
    position: 'absolute',
    top: spacing.medium
  },
  mainContent: {
    // position:'absolute'
  },
  leftContent: {
    position: 'absolute',
    left: 15 + spacing.medium_sm,
    bottom: spacing.medium_sm,
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftMargin: {
    marginLeft: spacing.medium_sm
  },
  rightContent: {
    position: 'absolute',
    right: spacing.medium_sm,
    bottom: spacing.medium_sm,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default React.memo(streamCard);