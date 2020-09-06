/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {FlatList, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../../constants/colors";
import {spacing} from "../../../constants/dimension";
import * as actionCreators from "../../../store/actions";
import TrainerSubscriptionCard from "../../../components/Trainer/SubscriptionCard";
import BatchSubscriptionCard from "../../../components/Trainer/BatchSubscriptionCard";
import UserSubscriptionCard from "../../../components/User/SubscriptionCard";
import {initialiseVideoCall, militaryTimeToString, sortDays, toTitleCase} from "../../../utils/utils";
import {requestCameraAndAudioPermission} from "../../../utils/permission";
import {subscriptionType, userTypes} from "../../../constants/appConstants";
import strings from "../../../constants/strings";
import RBSheet from "react-native-raw-bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import fonts from "../../../constants/fonts";
import fontSizes from "../../../constants/fontSizes";
import MultiSelectButtons from "../../../components/MultiSelectButtons";
import PillButton from "../../../components/PillButton";
import {hitSlop20} from "../../../constants/styles";
import RouteNames from "../../../navigation/RouteNames";

class Subscriptions extends PureComponent {
  state = {
    timings: {},
    days: {},
    subscriptions: []
  }

  async componentDidMount() {
    const {userData, syncSubscriptions} = this.props;
    this.updateView();
    const {userType} = userData;
    if (userType === userTypes.USER)
      this.props.navigation.setOptions({title: strings.SUBSCRIPTIONS});
    else {
      this.props.navigation.setOptions({headerRight: this.renderOptions});
    }
    await syncSubscriptions();
    this.updateView();
  }

  updateView = () => {
    let {subscriptions} = this.props;

    // Remove duplicate batch subscriptions
    let jsonObject = subscriptions.map(JSON.stringify);
    const uniqueSet = new Set(jsonObject);
    subscriptions = Array.from(uniqueSet).map(JSON.parse);

    const days = {}, timings = {};
    subscriptions.map(subscription => {
      const {slot} = subscription;
      const {time, daysOfWeek} = slot;
      timings[time] = true;
      daysOfWeek.map(day => days[day] = true);
    })
    this.setState({days, timings, subscriptions});
  }

  renderOptions = () => (
    <TouchableOpacity hitSlop={hitSlop20} style={{marginRight: spacing.medium_lg}} onPress={this.openRbSheet}>
      <Ionicons color={appTheme.brightContent} size={24} name={'ios-options'}/>
    </TouchableOpacity>
  )
  callClicked = async (userId) => {
    const permissionGranted = await requestCameraAndAudioPermission();
    if (permissionGranted) {
      await initialiseVideoCall(userId);
    } else console.log("Cant initiate video call without permission");
  }
  openProfile = (userId) => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.Profile, {
      userId: userId,
    });
  }
  renderSubscriptionCard = (subscription) => {
    const {heldSessions, totalSessions, startDate, endDate, package: packageData, slot, type, users, subscribedCount, maxParticipants} = subscription;
    const {time, daysOfWeek} = slot;
    const {title: packageTitle, price} = packageData;
    console.log(users);
    if (type && type === subscriptionType.BATCH)
      return <View style={styles.cardContainer}>
        <BatchSubscriptionCard
          users={users}
          time={militaryTimeToString(time)}
          title={packageTitle}
          onPressCall={this.callClicked}
          startDate={(new Date(startDate)).toLocaleDateString()}
          endDate={(new Date(endDate)).toLocaleDateString()}
          sessions={`(${heldSessions}/${totalSessions})`}
          participants={`(${subscribedCount}/${maxParticipants})`}
          price={price}
          days={daysOfWeek}
          openProfile={this.openProfile}
        />
      </View>

    let userData = subscription.user;
    if (!userData.name) userData = subscription.trainer;
    const {name: userName, displayPictureUrl: dpUrl, _id: userId} = userData;
    const {userType} = this.props.userData;
    const SubscriptionCard = userType === userTypes.TRAINER ? TrainerSubscriptionCard : UserSubscriptionCard;

    return <View style={styles.cardContainer}>
      <SubscriptionCard
        displayName={userName}
        imageUrl={dpUrl}
        title={packageTitle}
        time={militaryTimeToString(time)}
        onPressCall={() => this.callClicked(userId)}
        startDate={(new Date(startDate)).toLocaleDateString()}
        endDate={(new Date(endDate)).toLocaleDateString()}
        sessions={`(${heldSessions}/${totalSessions})`}
        price={price}
        days={daysOfWeek}
        openProfile={() => this.openProfile(userId)}
      />
    </View>
  }
  renderSubscriptionList = () => {
    const {userData} = this.props;
    const {subscriptions} = this.state;
    const {userType} = userData;
    if (subscriptions.length === 0) return (
      <View style={{flex: 1, marginTop: spacing.medium, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.sectionTitle}>{strings.NO_DATA}</Text>
      </View>
    )
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

  openRbSheet = () => this.RBSheet.open()
  closeRbSheet = () => {
    // this.refreshList();
    this.RBSheet.close();
  }
  rbSheet = () => (<RBSheet
      ref={ref => {
        this.RBSheet = ref;
      }}
      height={300}
      animationType={'slide'}
      closeOnDragDown={true}
      customStyles={{
        container: {
          padding: spacing.medium,
          backgroundColor: appTheme.darkBackground,
          borderRadius: 10,
          borderWidth: 1,
          borderTopColor: appTheme.content,
          borderRightColor: appTheme.content,
          borderLeftColor: appTheme.content,
        },
        wrapper: {
          backgroundColor: 'transparent'
        }
      }}
    >
      {this.renderFilters()}
    </RBSheet>
  )
  toggleTime = (time) => {
    const timings = {...this.state.timings};
    timings[time] = !timings[time];
    this.setState({timings}, this.refreshList);
  }
  toggleDay = (day) => {
    const days = {...this.state.days};
    days[day] = !days[day];
    this.setState({days}, this.refreshList);
  }
  refreshList = () => {
    let {subscriptions} = this.props;
    let timings = Object.keys(this.state.timings);
    let days = Object.keys(this.state.days);
    let filteredTimings = timings.filter(time => this.state.timings[time]);
    let filteredDays = days.filter(day => this.state.days[day]);
    const newSubs = subscriptions.filter(subscription => {
      const {time, daysOfWeek} = subscription.slot;
      if (!filteredTimings.includes(time)) return false;
      let dayMissingFlag = false;
      daysOfWeek.map(day => {
        if (filteredDays.includes(day)) dayMissingFlag = true;
      });
      return dayMissingFlag;
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({subscriptions: newSubs});
  }
  renderFilters = () => {
    return (
      <View>
        <View style={styles.sectionHeader}>
          <Fontisto name={'clock'} color={'white'} size={26}/>
          <Text style={styles.sectionTitle}>{strings.SESSION_TIME}</Text>
        </View>
        <MultiSelectButtons
          transformer={militaryTimeToString}
          onPress={this.toggleTime}
          data={this.state.timings}/>
        <View style={styles.sectionHeader}>
          <Fontisto name={'calendar'} color={'white'} size={26}/>
          <Text style={styles.sectionTitle}>{strings.SESSION_DAYS}</Text>
        </View>
        <MultiSelectButtons
          transformer={toTitleCase}
          onPress={this.toggleDay}
          sorter={sortDays}
          data={this.state.days}/>
        <View style={styles.buttonContainer}>
          <PillButton onPress={this.closeRbSheet} title={strings.DONE}/>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.renderSubscriptionList()}
        {this.rbSheet()}
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
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.small_lg,
    marginTop: spacing.medium,
    marginLeft: spacing.small
  },
  sectionTitle: {
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h1,
    marginLeft: spacing.medium_sm
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: spacing.medium
  }
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  subscriptions: state.trainer.subscriptions,
});

const mapDispatchToProps = (dispatch) => ({
  syncSubscriptions: () => dispatch(actionCreators.syncSubscriptions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);