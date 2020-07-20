/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../../constants/colors";
import {spacing} from "../../../constants/dimension";
import SubscriptionList from "../../../components/SubscriptionList";
import RouteNames from "../../../navigation/RouteNames";
import {requestCameraAndAudioPermission} from "../../../utils/permission";
import {initialiseVideoCall} from "../../../utils/utils";
import * as actionCreators from "../../../store/actions";

class Subscriptions extends PureComponent {

  componentDidMount() {
    this.props.syncSubscriptions();
  }

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
          onProfilePress={this.openProfile}
          callCallback={this.callClicked}/>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.background,
    flex: 1,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
  },
});

const mapStateToProps = (state) => ({
  subscriptions: state.trainer.subscriptions,
});

const mapDispatchToProps = (dispatch) => ({
  syncSubscriptions: () => dispatch(actionCreators.syncSubscriptions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);