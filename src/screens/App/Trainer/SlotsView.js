/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../../constants/colors";
import {spacing} from "../../../constants/dimension";
import * as actionCreators from "../../../store/actions";
import TrainerSubscriptionCard from "../../../components/Trainer/SubscriptionCard";
import UserSubscriptionCard from "../../../components/User/SubscriptionCard";
import {initialiseVideoCall, militaryTimeToString} from "../../../utils/utils";
import {requestCameraAndAudioPermission} from "../../../utils/permission";
import {userTypes} from "../../../constants/appConstants";
import strings from "../../../constants/strings";

class SlotsView extends Component {
  componentDidMount() {
    const {userData} = this.props;
    const {userType} = userData;
    if (userType === userTypes.USER)
      this.props.navigation.setOptions({title: strings.SUBSCRIPTIONS})
  }

  callClicked = async (userId) => {
    const permissionGranted = await requestCameraAndAudioPermission();
    if (permissionGranted) {
      await initialiseVideoCall(userId);
    } else console.log("Cant initiate video call without permission");
  }


  renderSubscriptionCard = (subscription) => {
    const {heldSessions, totalSessions, startDate, endDate, package: packageData, slot} = subscription;
    const {title: packageTitle, price} = packageData;
    let userData = subscription.user;
    if (!userData.name) userData = subscription.trainer;
    const {name: userName, displayPictureUrl: dpUrl, _id: userId} = userData;
    const {time, daysOfWeek} = slot;
    const {userType} = this.props.userData;
    const SubscriptionCard = userType === userTypes.TRAINER ? TrainerSubscriptionCard : UserSubscriptionCard;
    return <View style={styles.cardContainer}><SubscriptionCard
      displayName={userName}
      imageUrl={dpUrl}
      title={packageTitle}
      time={militaryTimeToString(time)}
      onPressCall={() => this.callClicked(userId)}
      startDate={(new Date(startDate)).toLocaleDateString()}
      endDate={(new Date(endDate)).toLocaleDateString()}
      sessions={`(${heldSessions}/${totalSessions})`}
      price={price}
      days={daysOfWeek}/>
    </View>
  }
  renderSubscriptionList = () => {
    const {subscriptions, userData} = this.props;
    const {userType} = userData;
    if (subscriptions.length === 1 && userType === userTypes.USER) return (
      <View style={{flex: 1, marginTop: spacing.medium, justifyContent: 'center'}}>
        {this.renderSubscriptionCard(subscriptions[0])}
      </View>
    )
    return <FlatList
      showsVerticalScrollIndicator={false}
      data={subscriptions}
      renderItem={({item}) => this.renderSubscriptionCard(item)}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={() => <View style={styles.cardContainer}/>}
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
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
  },
  cardContainer: {
    marginBottom: spacing.medium_lg
  }
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  subscriptions: state.trainer.subscriptions,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserData: () => dispatch(actionCreators.updateUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlotsView);