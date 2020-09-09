import React, {PureComponent} from "react";
import {StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity} from "react-native";

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
import LiveCardList from '../../components/LiveCardList';
import {screenWidth} from "../../utils/screenDimensions";
import {
  BarChart,
} from "react-native-chart-kit";

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
    userType === userTypes.TRAINER && getCallbacks();
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

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
  syncSubscriptions: () => dispatch(actionCreators.syncSubscriptions()),
  syncSessions: () => dispatch(actionCreators.syncSessions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
