import React, {PureComponent} from "react";
import {StyleSheet, Text, View, ScrollView, LayoutAnimation, TouchableOpacity,RefreshControl} from "react-native";
import {connect} from "react-redux";
import {Menu, MenuOption, MenuOptions, MenuTrigger, renderers} from "react-native-popup-menu";

import {spacing} from "../../constants/dimension";
import {appTheme, bmiColors} from "../../constants/colors";
import {streamStatus, userTypes} from "../../constants/appConstants";
import * as actionCreators from "../../store/actions";
import TodaySessionSwiper from "../../components/TodaySessionSwiper";
import {datesAreOnSameDay, getFormattedDate, getPastWeekDates} from "../../utils/utils";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import RouteNames from "../../navigation/RouteNames";
import StreamSwiper from "../../components/Social/StreamSwiper";
import {hostMeeting, joinMeeting} from "../../utils/zoomMeeting";
import FitnessSummary from "../../components/fitness/FitnessSummary";
import {startStream} from "../../API";
import Loader from "../../components/Loader";
import {showError} from "../../utils/notification";

class Activity extends PureComponent {
  state = {
    todaySessions: null,
    upcomingStreams: null,
    currentStats: null, // current and weekly calorie, water intake
    weeklyStats: null,
    currentSwitch: true, // when true, show current calorie stats, weekly otherwise,
    loading: false
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
    updateUserData(); // update my userData
    userType === userTypes.TRAINER && syncCoupons(); // Update my coupons
    syncSubscriptions(); // update my subscriptions
    syncSessions(); // Update my session data
    userType === userTypes.TRAINER && getCallbacks(); // get my call requests
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
    const {liveStreams, myLiveStreams} = this.props;
    const myStreamIds = myLiveStreams.map(stream => stream._id);
    // Check which streams are scheduled and show them
    let upcomingStreams = liveStreams.filter(stream => stream.status === streamStatus.SCHEDULED);
    upcomingStreams = upcomingStreams.sort(function(a,b){
      return new Date(a.date) - new Date(b.date);
     }).map(stream => {
      if (myStreamIds.includes(stream._id))
        stream.isMyStream = true;
      return stream
    });
    this.setState({upcomingStreams});
  }
  reduceDayCalories = data => {
    let proteins = 0, carbs = 0, fats = 0, calories = 0;
    // Loop through the data array and tally results
    if (data)
      data.map(
        item => {
          proteins += item.proteins;
          carbs += item.carbs;
          fats += item.fats;
          calories += item.total;
        }
      );
    return {proteins, carbs, fats, calories};
  }
  updateLocalStatsData = () => {
    const today = getFormattedDate();
    const {calorieData, waterIntake} = this.props;
    if (!calorieData) return;
    // Get today's stats
    const currentCalorie = calorieData[today];
    const currentWater = waterIntake[today] || 0;

    const currentStats = {
      ...this.reduceDayCalories(currentCalorie),
      water: currentWater
    }
    // Get last 7 days stats
    const pastWeek = getPastWeekDates();
    let weeklyStats = {
      proteins: 0,
      fats: 0,
      carbs: 0,
      water: 0,
      calories: 0
    };
    // Integers to divide calorie and water for taking average
    let calorieDivider = 0, waterDivider = 0;
    pastWeek.map(date => {
      const formattedDate = getFormattedDate(date);
      const datedCalorieData = calorieData[formattedDate];
      if (datedCalorieData) {
        calorieDivider++;
        const {proteins, carbs, fats, calories} = this.reduceDayCalories(datedCalorieData);
        weeklyStats.proteins += proteins;
        weeklyStats.carbs += carbs;
        weeklyStats.fats += fats;
        weeklyStats.calories += calories;
      }
      const waterData = waterIntake[formattedDate];
      if (waterData) {
        waterDivider++;
        weeklyStats.water += waterData;
      }
    });
    if (calorieDivider) {
      // Taking average
      weeklyStats.proteins /= calorieDivider;
      weeklyStats.carbs /= calorieDivider;
      weeklyStats.fats /= calorieDivider;
      weeklyStats.calories /= calorieDivider;
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
    if (!todaySessions || todaySessions.length === 0) return (
      <View style={[styles.card, styles.noContentContainer]}>
        <Text style={styles.noContent}>{strings.NO_UPCOMING_SESSIONS}</Text>
      </View>
    );
    return (
      <TodaySessionSwiper
        sessions={todaySessions}
        onJoin={this.openSessions}
        trainer={this.props.userType === userTypes.TRAINER}
        referenceMode={true} // modifies start button
      />
    )
  }
  onJoinStream = async (streamId) => {
    this.setState({loading: true});
    const {liveStreams, userName} = this.props;
    const targetStream = liveStreams.filter(liveStream => liveStream._id === streamId)[0];
    const {meetingNumber, meetingPassword, clientKey, clientSecret} = targetStream;
    await joinMeeting(meetingNumber, meetingPassword, userName, clientKey, clientSecret);
    this.setState({loading: false});
  }
  onStartStream = async (stream) => {
    this.setState({loading: true});
    const res = await startStream(stream._id);
    if (res.success) {
      await hostMeeting(stream.meetingNumber, res.token, this.props.userName, stream.clientKey, stream.clientSecret);
      this.props.setStreamFinished(stream._id);
    } else {
      showError(strings.FAILED_TO_START_STREAM);
    }
    this.setState({loading: false});
  }
  renderUpcomingStreams = () => {
    const {upcomingStreams} = this.state;
    if (!upcomingStreams || upcomingStreams.length === 0) return (
      <View style={[styles.card, styles.noContentContainer]}>
        <Text style={styles.noContent}>{strings.NO_UPCOMING_STREAMS}</Text>
      </View>
    );
    return (
      <StreamSwiper
        streams={upcomingStreams}
        onJoin={this.onJoinStream}
        onStart={this.onStartStream}
      />
    )
  }

  renderHealthStats = () => {
    const {currentStats, currentSwitch, weeklyStats} = this.state;
    return (
      <View style={[styles.sessionContainer, styles.card]}>
        <View style={styles.row}>
          <Text style={styles.subtitle}>{strings.HEALTH_SUMMARY}</Text>
          <TouchableOpacity 
            style={styles.calorieButton}
            onPress={() => this.props.navigation.navigate(RouteNames.CalorieCounter)}>
              <Text style={styles.calorieText}>Add</Text>
          </TouchableOpacity>
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
              <Text style={styles.menuTitle}>{currentSwitch ? strings.TODAY : strings.SEVEN_DAYS}</Text>
            </MenuTrigger>
            <MenuOptions customStyles={styles.menu}>
              <MenuOption style={styles.menuButton} onSelect={this.setToday}>
                <Text style={styles.menuText}>{strings.TODAY}</Text>
              </MenuOption>
              <MenuOption style={styles.menuButton} onSelect={this.setWeekly}>
                <Text style={styles.menuText}>{strings.SEVEN_DAYS}</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <FitnessSummary
          stats={currentSwitch ? currentStats : weeklyStats}
          renderPerDay={!currentSwitch}
        />
      </View>
    )
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentDidMount()
   
  }

  render() {
    return (
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={this._onRefresh}
        />
      }
       showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.sessionContainer}>
          <Text style={styles.subtitle}>{strings.UPCOMING_STREAMS}</Text>
          {this.renderUpcomingStreams()}
        </View>
        <View style={styles.sessionContainer}>
          <Text style={styles.subtitle}>{strings.SESSIONS}</Text>
          {this.renderTodaySessions()}
        </View>
        {this.renderHealthStats()}
        <Loader loading={this.state.loading}/>
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
    marginLeft: 2,
  },
  menuContainer: {
    borderColor: appTheme.grey,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    padding: spacing.small,
    paddingHorizontal: spacing.small_lg
  },
  calorieButton : {
    borderColor: appTheme.grey,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: appTheme.darkBackground,
    alignItems: 'center',
    padding: spacing.small_lg,
    paddingHorizontal: spacing.medium_sm,
    marginLeft : '20%'
  },
  calorieText: {
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothic,
    fontSize: fontSizes.h3,
    fontWeight : "bold",
    textAlign: 'center'
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
  },
  noContentContainer: {
    minHeight: 100,
    justifyContent: 'center',
  },
  noContent: {
    color: bmiColors.lightBlue,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h2,
    textAlign: 'center'
  }
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  userType: state.user.userType,
  sessions: state.trainer.sessions,
  liveStreams: state.social.liveStreams,
  myLiveStreams: state.social.myLiveStreams,
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
  setStreamFinished: (streamId) => dispatch(actionCreators.setLiveStreamStatus(streamId, streamStatus.FINISHED))
});

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
