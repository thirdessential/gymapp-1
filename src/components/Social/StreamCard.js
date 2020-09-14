/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ImageBackground} from "react-native";

import {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import strings from "../../constants/strings";
import {getRandomImage} from "../../constants/images";
import {streamStatus, streamStatusColor, streamText} from "../../constants/appConstants";
import {formattedDayDate, formattedTime, toTitleCase} from "../../utils/utils";
import Avatar from "../Avatar";

const streamCard = ({title, status, duration, date, host, onJoin, onStart}) => {
  const [bgSource] = useState(getRandomImage);

  let _startEnabled = false;
  if (onStart) {
    const streamDate = new Date(date);
    const now = new Date();
    if (now > streamDate) _startEnabled = true;
    if (Math.abs((now - streamDate) / 1000) < 600) // less than 600 secs or 10 mins
      _startEnabled = true;
    if (status !== streamStatus.SCHEDULED) _startEnabled = false;
  }
  const [startEnabled, setStartEnabled] = useState(_startEnabled);
  if (onStart) {
    useEffect(() => {
      const interval = setInterval(() => {
        const streamDate = new Date(date);
        const now = new Date();
        let _startEnabled = false;

        if (now > streamDate) _startEnabled = true;
        if (Math.abs((now - streamDate) / 1000) < 600) // less than 600 secs or 10 mins
          _startEnabled = true;
        if (status !== streamStatus.SCHEDULED) _startEnabled = false;
        setStartEnabled(_startEnabled);
      }, 30000);
      return () => clearInterval(interval);
    }, []);
  }
  return (
    <TouchableOpacity
      disabled={status === streamStatus.SCHEDULED || status === streamStatus.FINISHED || !onJoin}
      onPress={onJoin} activeOpacity={0.7}>
      <ImageBackground
        blurRadius={5}
        borderRadius={14}
        style={styles.container}
        source={bgSource}>
        <View style={[styles.statusButton, {backgroundColor: streamStatusColor[status]}]}>
          <Text style={styles.subHeading}>{streamText[status]}</Text>
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
          {
            onStart && startEnabled && status !== streamStatus.FINISHED && (
              <TouchableOpacity onPress={onStart} style={styles.startButton}>
                <Text style={styles.subHeading}>{strings.START}</Text>
              </TouchableOpacity>
            )
          }
        </View>

      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 210,
    elevation: 5,
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
  mainContent: {},
  leftContent: {
    position: 'absolute',
    left: spacing.medium_sm,
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
  },
  startButton: {
    backgroundColor: appTheme.live,
    borderRadius: 6,
    padding: spacing.small,
    paddingHorizontal: spacing.medium_sm
  }
});

export default React.memo(streamCard);