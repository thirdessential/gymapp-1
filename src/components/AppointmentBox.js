/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native'

import  {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import Avatar from "./Avatar";
import {militaryTimeToString} from "../utils/utils";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";

const appointmentBox = (props) => {
  const {date, time, displayName, displayPictureUrl} = props;
  const datObj = new Date(date);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.pictureContainer}>
          <Avatar url={displayPictureUrl} size={spacing.space_50}/>
        </View>
        <View style={{alignItems:'flex-end'}}>
          <Text style={styles.timeText}>{datObj.toLocaleDateString()}</Text>
          <Text style={styles.timeText}>{militaryTimeToString(time)}</Text>
        </View>
      </View>
      <Text style={styles.displayName}>{displayName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.darkBackground,
    elevation: 5,
    borderRadius: 10,
    padding: spacing.medium_sm,
    paddingTop:spacing.medium,
    paddingBottom:spacing.medium
  },
  titleContainer: {
    flexDirection: 'row',
  },
  pictureContainer: {
    marginRight:'auto'
  },
  timeText:{
    color:'white',
    fontFamily:fonts.CenturyGothicBold,
    fontSize:fontSizes.h3-1
  },
  displayName:{
    color:appTheme.brightContent,
    fontFamily:fonts.CenturyGothicBold,
    fontSize:fontSizes.h2,
    marginTop:spacing.medium_sm,
    height:fontSizes.h2*3
  }
});

export default React.memo(appointmentBox);