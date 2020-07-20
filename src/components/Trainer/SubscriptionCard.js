/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {spacing} from "../../constants/dimension";
import {appTheme} from "../../constants/colors";
import Avatar from "../Avatar";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import CallButton from "../CallButton";
import DaysRow from "../DaysRow";

const subscriptionCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Avatar url={props.imageUrl} size={spacing.thumbnailMini} roundedMultiplier={1}/>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.sectionTitle}>{props.displayName}</Text>
          <Text style={styles.detail}>{props.title}</Text>
        </View>
      </View>
      <View style={styles.separator}/>

      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.subtitle}>{strings.SESSION_TIME}</Text>
          <Text style={styles.contentText}>{props.time}</Text>
        </View>
        <CallButton onPress={props.onPressCall}/>
      </View>
      <View style={styles.separator}/>

      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.subtitle}>{strings.START_FROM}</Text>
          <Text style={styles.contentText}>{props.startDate}</Text>
        </View>
        <View style={styles.endAlign}>
          <Text style={styles.subtitle}>{strings.END_AT}</Text>
          <Text style={styles.contentText}>{props.endDate}</Text>
        </View>
      </View>
      <View style={[styles.sectionContainer, {marginTop: spacing.medium_sm}]}>
        <View>
          <Text style={styles.subtitle}>{strings.TOTAL_SESSIONS}</Text>
          <Text style={styles.contentText}>{props.sessions}</Text>
        </View>
        <View style={styles.endAlign}>
          <Text style={styles.subtitle}>{strings.PRICE_TITLE}</Text>
          <Text style={styles.contentText}>{props.price}/-</Text>
        </View>
      </View>
      <View style={styles.separator}/>

      <Text style={styles.sectionTitle}>{strings.SESSION_DAYS}</Text>
      <View style={styles.daysContainer}>
        <DaysRow activeDays={props.days}/>
      </View>
    </View>
  )
}

subscriptionCard.propTypes = {};

const styles = StyleSheet.create({
  container: {
    elevation: 8,
    padding: spacing.medium,
    borderRadius: 10,
    backgroundColor: appTheme.darkBackground
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitle: {
    color: appTheme.brightContent,
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothicBold,
    marginBottom: spacing.small
  },
  detail: {
    color: 'white',
    fontSize: fontSizes.h2,
    fontFamily: fonts.CenturyGothic,
  },
  separator: {
    height: 0.8,
    backgroundColor: appTheme.brightContent,
    marginTop: spacing.medium,
    marginBottom: spacing.medium
  },
  subtitle: {
    color: appTheme.greyC,
    fontSize: fontSizes.h2,
    fontFamily: fonts.CenturyGothic,
    marginBottom: spacing.small_sm
  },
  contentText: {
    color: 'white',
    fontSize: fontSizes.h2,
    fontFamily: fonts.CenturyGothicBold,
  },
  endAlign: {
    alignItems: 'flex-end'
  },
  daysContainer:{
    marginTop: spacing.medium_sm,
    marginBottom:spacing.small_sm
  }

});

export default React.memo(subscriptionCard);