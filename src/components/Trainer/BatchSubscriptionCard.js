/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, FlatList, LayoutAnimation} from 'react-native'
import {spacing} from "../../constants/dimension";
import {appTheme} from "../../constants/colors";
import Avatar from "../Avatar";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import CallButton from "../CallButton";
import DaysRow from "../DaysRow";
import Entypo from "react-native-vector-icons/Entypo";

const batchSubscriptionCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const renderUser = ({item: user}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={()=>props.openProfile(user._id)}
      style={[styles.sectionContainer, styles.card]}>
      <Avatar url={user.displayPictureUrl} size={spacing.space_50} roundedMultiplier={1}/>
      <View style={styles.row}>
        <View style={styles.endMargin}>
          <Text style={styles.sectionTitle}>{user.name}</Text>
          <Text style={styles.detail}>{user.heldSessions}/{user.totalSessions} {strings.SESSIONS}</Text>
        </View>
        <CallButton onPress={() => props.onPressCall(user._id)}/>
      </View>
    </TouchableOpacity>
  )
  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  }
  const renderExpander = () => (
    <TouchableOpacity
      onPress={toggleExpanded}
      style={styles.expander}>
      <Text style={styles.brightInfo}>{expanded ? strings.HIDE: strings.VIEW_ALL}</Text>
      <Entypo
        name={expanded ? 'chevron-up' : 'chevron-down'}
        size={20}
        style={{marginLeft: spacing.small_sm}}
        color={appTheme.brightContent}/>
    </TouchableOpacity>
  )
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{props.title}</Text>
      <FlatList
        data={expanded ? props.users : props.users.slice(0, 2)}
        renderItem={renderUser}
        keyExtractor={(item) => item._id}/>
      {props.users.length > 2 && renderExpander()}
      <View style={styles.separator}/>

      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.subtitle}>{strings.SESSION_TIME}</Text>
          <Text style={styles.contentText}>{props.time}</Text>
        </View>
        <View style={styles.endAlign}>
          <Text style={styles.subtitle}>{strings.SUBSCRIPTIONS}</Text>
          <Text style={styles.contentText}>{props.participants}</Text>
        </View>
        {/*<CallButton onPress={props.onPressCall}/>*/}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  card: {
    marginTop: spacing.medium_sm
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
    color: appTheme.textPrimary,
    fontSize: fontSizes.h2,
    fontFamily: fonts.CenturyGothicBold,
  },
  endAlign: {
    alignItems: 'flex-end'
  },
  daysContainer: {
    marginTop: spacing.medium_sm,
    marginBottom: spacing.small_sm
  },
  endMargin: {
    alignItems: 'flex-end',
    marginRight: spacing.medium_sm
  },
  brightInfo: {
    color: appTheme.brightContent,
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothicBold,
  },
  expander: {
    marginTop: spacing.small,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export default React.memo(batchSubscriptionCard);