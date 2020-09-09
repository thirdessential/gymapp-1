import React, {PureComponent} from "react";
import {StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity} from "react-native";
import {connect} from "react-redux";

import {spacing} from "../../constants/dimension";
import {appTheme, darkPallet} from "../../constants/colors";
import {streamStatus, userTypes} from "../../constants/appConstants";
import * as actionCreators from "../../store/actions";
import TodaySessionSwiper from "../../components/TodaySessionSwiper";
import {datesAreOnSameDay} from "../../utils/utils";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import RouteNames from "../../navigation/RouteNames";
import StreamSwiper from "../../components/Social/StreamSwiper";
import {joinMeeting} from "../../utils/zoomMeeting";
import StreamList from "../../components/Social/StreamList";

class Activity extends PureComponent {
  state = {
    todaySessions: null,
    upcomingStreams: null
  }

  componentDidMount() {
    const {
      updateUserData,
      syncCoupons,
      getCallbacks,
      userType,
      syncSubscriptions,
      syncSessions
    } = this.props;
    updateUserData();
    syncCoupons();
    syncSubscriptions();
    syncSessions();
    this.updateLocalSessionData();
    this.updateLocalStreamData()
    userType === userTypes.TRAINER && getCallbacks();
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
    paddingHorizontal: spacing.medium
  },
  subtitle: {
    color: appTheme.greyC,
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothicBold,
    marginBottom: spacing.small_lg,
    marginLeft: 2
  }
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  activities: state.user.activities,
  userType: state.user.userType,
  sessions: state.trainer.sessions,
  liveStreams: state.social.liveStreams,
  userName: state.user.userData.name
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
