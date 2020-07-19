/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../../constants/colors";
import {spacing} from "../../../constants/dimension";
import * as actionCreators from "../../../store/actions";
import SubscriptionCard from "../../../components/SubscriptionCard";
import {initialiseVideoCall, militaryTimeToString} from "../../../utils/utils";
import {requestCameraAndAudioPermission} from "../../../utils/permission";

class SlotsView extends Component {
  componentDidMount() {
  }

  getUser = () => {
    const {route, users} = this.props;
    if (route.params && route.params.userId)
      return users[route.params.userId];
    else return this.props.userData;
  }
  selfNavigated = () => {
    const {route} = this.props;
    return !(route.params && route.params.userId);
  }

  callClicked = async (userId) => {
    const permissionGranted = await requestCameraAndAudioPermission();
    if (permissionGranted) {
      await initialiseVideoCall(userId);
    } else console.log("Cant initiate video call without permission");
  }


  renderSubscriptionCard = (subscription) => {
    const {heldSessions, totalSessions, startDate, endDate, package: packageData, user: userData, slot} = subscription;
    const {title: packageTitle, price} = packageData;
    const {name: userName, displayPictureUrl: dpUrl, _id: userId} = userData;
    const {time, daysOfWeek} = slot;
    return <SubscriptionCard
      displayName={userName}
      imageUrl={dpUrl}
      title={packageTitle}
      time={militaryTimeToString(time)}
      onPressCall={()=>this.callClicked(userId)}
      startDate={(new Date(startDate)).toLocaleDateString()}
      endDate={(new Date(endDate)).toLocaleDateString()}
      sessions={`(${heldSessions}/${totalSessions})`}
      price={price}
      days={daysOfWeek}
    />
  }
  renderSubscriptionList = () => {
    const {subscriptions} = this.props;
    return <FlatList
      showsHorizontalScrollIndicator={false}
      data={subscriptions}
      renderItem={({item}) => this.renderSubscriptionCard(item)}
      keyExtractor={(item, index) => index.toString()}
    />
  }

  render() {

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.renderSubscriptionList()}
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

const mapDispatchToProps = (dispatch) => ({
  updateUserData: () => dispatch(actionCreators.updateUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlotsView);