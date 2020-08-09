import React, {PureComponent} from "react";
import {StyleSheet, Text, View, FlatList, ScrollView} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import {connect} from "react-redux";

import {spacing} from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {appTheme, darkPallet} from "../../constants/colors";
import Avatar from "../../components/Avatar";
import {getJoinDurationString, toTitleCase} from "../../utils/utils";
import RouteNames from "../../navigation/RouteNames";
import {defaultDP, userTypes} from "../../constants/appConstants";
import TimelineTabview from "../../components/TimelineTabview";
import * as actionCreators from "../../store/actions";
import {setAvailable} from "../../API";
import LiveCardList from '../../components/LiveCardList'

const data = [
  {
    day: "Monday",
    duration: "1 hr",
    time: "12:30 PM",
    bodyPart: "Biceps",
  },
  {
    day: "Tuesday",
    duration: "2 hrs",
    time: "4:30 PM",
    bodyPart: "Chest",
  },
  {
    day: "Wednesday",
    duration: "2 hrs",
    time: "1:30 PM",
    bodyPart: "Full",
  },
  {
    day: "Thursday",
    duration: "1 hr",
    time: "12:30 PM",
    bodyPart: "Thighs",
  },
  {
    day: "Friday",
    duration: "1 hr",
    time: "12 PM",
    bodyPart: "Shoulder",
  },
  {
    day: "Saturday",
    duration: "1 hr",
    time: "1:30 PM",
    bodyPart: "Legs",
  },
];

class Activity extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
    };
  }

  componentDidMount() {
    setAvailable();
    const {
      navigation,
      getActivities,
      updateUserData,
      syncCoupons,
      getCallbacks,
      userType,
    } = this.props;
    updateUserData();
    syncCoupons();
    userType === userTypes.TRAINER && getCallbacks();
    this.unsubscribeFocus = navigation.addListener("focus", (e) => {
      getActivities();
    });
  }

  componentWillUnmount() {
    this.unsubscribeFocus();
  }

  renderUser = () => {
    const {userData} = this.props;
    if (!userData) return null;
    return (
      <View style={styles.userContainer}>
        <Avatar
          url={userData.displayPictureUrl || defaultDP}
          size={spacing.thumbnailSmall}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.displayName}>{toTitleCase(userData.name)}</Text>
          <Text style={styles.infoText}>
            {getJoinDurationString(userData.dateJoined, userData.userType)}
          </Text>
        </View>
      </View>
    );
  };

  openProfile = (userId) => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.Profile, {
      userId: userId,
    });
  };

  render() {
    const {activities} = this.props;
    const {todaysEvents, tomorrowsEvents} = activities;

    return (
      <ScrollView style={styles.container}>
        {this.renderUser()}
        <LiveCardList data={this.state.data}/>
        <View style={{flex: 1, width: "100%", marginTop: spacing.medium_lg}}>
          <TimelineTabview
            today={todaysEvents}
            tomorrow={tomorrowsEvents}
            onProfilePress={this.openProfile}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingLeft: spacing.medium_lg,
    paddingRight: spacing.medium_lg,
    paddingTop: spacing.medium_lg,
    // paddingBottom: spacing.medium,
    // alignItems: "center",
    backgroundColor: appTheme.background,
  },
  titleContainer: {
    marginTop: spacing.medium_sm,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular,
  },
  displayName: {
    color: "white",
    fontSize: fontSizes.h1,
    fontFamily: fonts.MontserratMedium,
  },
  infoText: {
    color: appTheme.lightContent,
    fontSize: fontSizes.h2,
    fontFamily: fonts.MontserratMedium,
  },
  listContainer: {
    width: "100%",
  },

  userContainer: {
    width: "100%",
    alignItems: "center",
  },
  editButton: {
    marginLeft: spacing.medium_sm,
    padding: spacing.small,
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  activities: state.user.activities,
  userType: state.user.userType,
});

const mapDispatchToProps = (dispatch) => ({
  getActivities: () => dispatch(actionCreators.getActivities()),
  updateUserData: () => dispatch(actionCreators.updateUserData()),
  syncCoupons: () => dispatch(actionCreators.syncCoupons()),
  getCallbacks: () => dispatch(actionCreators.getCallbacks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
