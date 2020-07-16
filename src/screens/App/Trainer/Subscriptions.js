/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../../constants/colors";
import {spacing} from "../../../constants/dimension";
import SubscriptionList from "../../../components/SubscriptionList";
import RouteNames from "../../../navigation/RouteNames";
import {requestCameraAndAudioPermission} from "../../../utils/permission";
import {initialiseVideoCall} from "../../../utils/utils";

class Subscriptions extends Component {

  openProfile = (userId) => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.Profile, {
      userId: userId
    });
  }
  callClicked = async (userId) => {
    const permissionGranted = await requestCameraAndAudioPermission();

    if (permissionGranted) {
      await initialiseVideoCall(userId);
    } else console.log("Cant initiate video call without permission");
  }
  render() {
    const {subscriptions} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <SubscriptionList
          subscriptions={subscriptions}
          onProfilePress={this.onProfilePress}
          callCallback={this.callCallback}/>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.background,
    flex: 1,
    padding: spacing.medium,
    paddingBottom: spacing.large_lg
  },

});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  subscriptions: state.trainer.subscriptions,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);