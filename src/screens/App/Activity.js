import React, {PureComponent} from "react";
import {StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, LayoutAnimation} from "react-native";
import {connect} from "react-redux";

import {spacing} from "../../constants/dimension";
import {appTheme} from "../../constants/colors";
import {streamStatus, userTypes} from "../../constants/appConstants";
import * as actionCreators from "../../store/actions";
import TodaySessionSwiper from "../../components/TodaySessionSwiper";
import {datesAreOnSameDay, getFormattedDate, getPastWeekDates} from "../../utils/utils";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import RouteNames from "../../navigation/RouteNames";
import StreamSwiper from "../../components/Social/StreamSwiper";
import {joinMeeting} from "../../utils/zoomMeeting";
import FitnessSummary from "../../components/fitness/FitnessSummary";
import {Menu, MenuOption, MenuOptions, MenuTrigger, renderers} from "react-native-popup-menu";
import {string} from "prop-types";


class Activity extends PureComponent {
  state = {
    todaySessions: null,
    upcomingStreams: null,
    currentStats: null,
    weeklyStats: null,
    currentSwitch: true
  }

  setToday = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({currentSwitch: true})
  }
  setWeekly = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({currentSwitch: false})
  }

  componentDidMount() {
    const {
      updateUserData,
      syncCoupons,
      getCallbacks,
      userType,
      syncSubscriptions,
      syncSessions,
      navigation
    } = this.props;
    updateUserData();
    syncCoupons();
    syncSubscriptions();
    syncSessions();
    userType === userTypes.TRAINER && getCallbacks();
    this.updateLocalSessionData();
    this.updateLocalStreamData()
    this.updateLocalStatsData();
    this.unsubscribeFocus = navigation.addListener('focus', e => {
      this.updateLocalStatsData();
    })
  }

  componentWillUnmount() {
    this.unsubscribeFocus();
  }

  updateLocalSessionData = () => {
    const {sessions} = this.props;
    const today = new Date();
    if (!sessions || sessions.length === 0) return;
    const todaySessions = sessions.filter(session => datesAreOnSameDay(new Date(session.date), today));
    this.setState({todaySessions});
  }
  updateLocalStreamData = () => {
    const {liveStreams} = this.props;
    const upcomingStreams = liveStreams.filter(stream => stream.status === streamStatus.SCHEDULED);
    this.setState({upcomingStreams});
  }
  reduceDayCalories = data => {
    let proteins = 0, carbs = 0, fats = 0;
    if (data)
      data.map(
        item => {
          proteins += item.proteins;
          carbs += item.carbs;
          fats += item.fats;
        }
      );
    return {proteins, carbs, fats};
  }
  updateLocalStatsData = () => {
    const today = getFormattedDate();
    const {calorieData, waterIntake} = this.props;
    if (!calorieData) return;
    const currentCalorie = calorieData[today];
    const currentWater = waterIntake[today] || 0;

    const currentStats = {
      ...this.reduceDayCalories(currentCalorie),
      water: currentWater
    }
    const pastWeek = getPastWeekDates();
    let weeklyStats = {
      proteins: 0,
      fats: 0,
      carbs: 0,
      water: 0
    };
    let calorieDivider = 0, waterDivider = 0;
    pastWeek.map(date => {
      const formattedDate = getFormattedDate(date);
      const datedCalorieData = calorieData[formattedDate];
      if (datedCalorieData) {
        calorieDivider++;
        console.log(datedCalorieData, '1')
        const {proteins, carbs, fats} = this.reduceDayCalories(datedCalorieData);
        weeklyStats.proteins += proteins;
        weeklyStats.carbs += carbs;
        weeklyStats.fats += fats;
      }
      const waterData = waterIntake[formattedDate];
      if (waterData) {
        waterDivider++;
        weeklyStats.water += waterData;
      }
    });
    if (calorieDivider) {
      weeklyStats.proteins /= calorieDivider;
      weeklyStats.carbs /= calorieDivider;
      weeklyStats.fats /= calorieDivider;
    }
    if (waterDivider)
      weeklyStats.water /= waterDivider;

    this.setState({weeklyStats, currentStats});
  }
  openSessions = () => {
    this.props.navigation.navigate(RouteNames.Sessions);
  }
  renderTodaySessions = () => {
    const {todaySessions} = this.state;
    if (!todaySessions) return null;  //TODO: should we return some sort of no sessions message?
    return (
      <TodaySessionSwiper
        sessions={todaySessions}
        onJoin={this.openSessions}
        trainer={this.props.userType === userTypes.TRAINER}
        referenceMode={true} // modifies start button
      />
    )
  }
  onJoinStream = (streamId) => {
    const {liveStreams, userName} = this.props;
    const targetStream = liveStreams.filter(liveStream => liveStream._id === streamId)[0];
    const {meetingNumber, meetingPassword, clientKey, clientSecret} = targetStream;
    joinMeeting(meetingNumber, meetingPassword, userName, clientKey, clientSecret);
  }
  renderUpcomingStreams = () => {
    const {upcomingStreams} = this.state;
    if (!upcomingStreams) return null;
    return (
      <StreamSwiper
        streams={upcomingStreams}
        onJoin={this.onJoinStream}
      />
    )
  }

  renderHealthStats = () => {
    const {currentStats, currentSwitch, weeklyStats} = this.state;
    return (
      <View style={[styles.sessionContainer, styles.card]}>
        <View style={styles.row}>
          <Text style={styles.subtitle}>{strings.HEALTH_SUMMARY}</Text>
          <Menu
            style={styles.menuContainer}
            rendererProps={{
              placement: 'bottom', anchorStyle: {
                backgroundColor: appTheme.darkGrey,
                marginTop: spacing.medium_sm
              }
            }}
            renderer={renderers.Popover}
          >
            <MenuTrigger customStyles={{padding: spacing.small_lg}}>
              <Text style={styles.menuTitle}>{currentSwitch ? strings.TODAY : strings.LAST_WEEK}</Text>
            </MenuTrigger>
            <MenuOptions customStyles={styles.menu}>
              <MenuOption style={styles.menuButton} onSelect={this.setToday}>
                <Text style={styles.menuText}>{strings.TODAY}</Text>
              </MenuOption>
              <MenuOption style={styles.menuButton} onSelect={this.setWeekly}>
                <Text style={styles.menuText}>{strings.LAST_WEEK}</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <FitnessSummary
          stats={currentSwitch ? currentStats : weeklyStats}
        />
      </View>
    )
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.sessionContainer}>
          <Text style={styles.subtitle}>{strings.UPCOMING_STREAMS}</Text>
          {this.renderUpcomingStreams()}
        </View>
        <View style={styles.sessionContainer}>
          <Text style={styles.subtitle}>{strings.SESSIONS}</Text>
          {this.renderTodaySessions()}
        </View>
        {this.renderHealthStats()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.medium_lg,
    backgroundColor: appTheme.background,
  },
  sessionContainer: {
    marginHorizontal: spacing.medium
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subtitle: {
    color: appTheme.greyC,
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothicBold,
    marginBottom: spacing.small_lg,
    marginLeft: 2
  },
  menuContainer: {
    borderColor: appTheme.grey,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    padding: spacing.medium_sm
  },
  menuTitle: {
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h3
  },
  menu: {
    backgroundColor: appTheme.background,
  },
  menuButton: {
    flexDirection: 'row',
    backgroundColor: appTheme.background,
    alignItems: 'center',
    padding: spacing.small_lg,
    paddingHorizontal: spacing.medium_sm
  },
  menuText: {
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothic,
    fontSize: fontSizes.h3,
    textAlign: 'center'
  },
  card: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 12,
    padding: spacing.medium_sm,
    marginBottom: spacing.large_lg
  }
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  activities: state.user.activities,
  userType: state.user.userType,
  sessions: state.trainer.sessions,
  liveStreams: state.social.liveStreams,
  userName: state.user.userData.name,
  calorieData: state.fitness.calorieData,
  waterIntake: state.fitness.waterIntake,
});

const mapDispatchToProps = (dispatch) => ({
  getActivities: () => dispatch(actionCreators.getActivities()),
  updateUserData: () => dispatch(actionCreators.updateUserData()),
  syncCoupons: () => dispatch(actionCreators.syncCoupons()),
  getCallbacks: () => dispatch(actionCreators.getCallbacks()),
  syncSubscriptions: () => dispatch(actionCreators.syncSubscriptions()),
  syncSessions: () => dispatch(actionCreators.syncSessions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
