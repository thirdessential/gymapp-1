/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ActivityIndicator} from 'react-native'

import colors, {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import Avatar from "./Avatar";
import {militaryTimeToString} from "../utils/utils";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";
import strings from "../constants/strings";
import {callbackStatus} from "../constants/appConstants";
import CallButton from "./CallButton";
import Ion from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

const callbackBox = (props) => {
  const {date, city, displayName, displayPictureUrl, status} = props;
  const datObj = new Date(date);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={props.openProfile} style={styles.pictureContainer}>
          <Avatar url={displayPictureUrl} size={spacing.thumbnail}/>
        </TouchableOpacity>
        <View style={{marginLeft: spacing.large}}>
          <TouchableOpacity onPress={props.openProfile}>
            <Text style={styles.displayName}>{displayName}</Text>
            <Text style={styles.subtitle}>{city}</Text>
            <Text style={styles.subtitle}>{datObj.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <View style={[styles.row, {justifyContent: 'space-between', marginTop: spacing.small_lg}]}>
            {status === callbackStatus.REQUESTED && (
              <>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={props.acceptRequest}
                >
                  <FontAwesome
                    name={"check"}
                    color={appTheme.brightContent}
                    size={30}
                  />
                </TouchableOpacity>
              </>
            )}
            {
              status === callbackStatus.ACCEPTED && (
                <>
                  <TouchableOpacity onPress={props.done}
                                    style={[styles.button, {backgroundColor: appTheme.brightContent}]}>
                    <Text style={styles.buttonText}>{strings.DONE}</Text>
                  </TouchableOpacity>
                  <CallButton height={30} onPress={props.call} size={20}/>
                </>
              )
            }
          </View>
        </View>
      </View>
      {status === callbackStatus.REQUESTED && (
        <TouchableOpacity
          style={{position: 'absolute', top: spacing.medium, right: spacing.medium}}
          onPress={props.rejectRequest}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
          <FontAwesome
            name={'trash'}
            color={colors.rejectRed}
            size={22}
          />
        </TouchableOpacity>
      )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.darkBackground,
    elevation: 5,
    borderRadius: 10,
    padding: spacing.medium,
    // paddingTop: spacing.medium,
    // paddingBottom:spacing.medium
  },
  row: {
    flexDirection: 'row',
    // justifyContent:'space-between'
  },
  pictureContainer: {
    // marginRight: 'auto'
  },
  displayName: {
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h2,
  },
  subtitle: {
    color: appTheme.grey,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h3,
  },
  button: {
    padding: spacing.small,
    borderRadius: 6,
    paddingHorizontal: spacing.small_lg
  },
  buttonText: {
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h3,
  }
});

export default React.memo(callbackBox);