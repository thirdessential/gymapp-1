/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Text, LayoutAnimation} from 'react-native'
import {connect} from "react-redux";
import cuid from 'cuid';
import {spacing} from "../../constants/dimension";
import * as actionCreators from "../../store/actions";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {appTheme} from "../../constants/colors";
import strings from "../../constants/strings";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";

import Slot from "../../components/Slot";
import { findMissingDays, groupBy} from "../../utils/utils";
import {showError, showSuccess} from "../../utils/notification";

class Enroll extends Component {

  state = {
    slots: [],
    selectedDays: {},
  }

  componentDidMount() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const {slots} = this.getUser();

    if (slots && slots.length > 0) {
      const filteredSlots = slots.filter(slot=>slot.subscriptionId===null);
      const localSlots = this.mapSlotsToLocal(filteredSlots);
      const selectedDays = {};
      localSlots.map(slot => {
        selectedDays[slot._id] = [];
      });
      this.setState({selectedDays, slots: localSlots});
    }
  }

  getUser = () => {
    const {route, users} = this.props;
    const {userId} = route.params;
    return users[userId];
  }


  mapSlotsToLocal = (slots) => {
    const localSlots = [];
    const slotsByTime = groupBy(slots, 'time');
    Object.keys(slotsByTime).map(time => {
      let slotsAtT = slotsByTime[time];
      const slotObj = slotsAtT[0];
      let days = [];
      slotsAtT.map(slotAtT => days.push(slotAtT.dayOfWeek));
      slotObj.days = days;
      localSlots.push(slotObj);
    })
    return localSlots;
  }

  enroll = async (time, days) => {
    const {route, navigation} = this.props;
    const {userId, packageId} = route.params;
    let result = await this.props.subscribePackage(userId, packageId, time, days);
    if (result){
      showSuccess(strings.SLOT_BOOKING_SUCCESS);
      navigation.goBack(); //TODO:go to my slots screen
    }
    else showError(strings.SLOT_BOOKING_ERROR);
  }

  changeActiveDays = (slotId, days) => {
    const selectedDays = {...this.state.selectedDays};
    Object.keys(selectedDays).map(day => selectedDays[day] = []);
    selectedDays[slotId] = days;
    this.setState({selectedDays});
  }

  renderSlots = () => {
    return this.state.slots.map((slot, index) => (
      <View key={slot._id} style={styles.slotContainer}>
        <Slot
          days={this.state.selectedDays[slot._id]}
          disabledDays={findMissingDays(slot.days)}
          duration={slot.duration}
          index={index + 1}
          time={slot.time}
          onEnroll={() => this.enroll(slot.time, this.state.selectedDays[slot._id])}
          enrollDisabled={this.state.selectedDays[slot._id].length === 0}
          onDaysChange={(days) => this.changeActiveDays(slot._id, days)}
        />
      </View>
    ))
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <StatusBar backgroundColor={appTheme.darkBackground}/>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{strings.SLOTS}</Text>
        </View>
        <View style={styles.listContainer}>
          <this.renderSlots/>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.background,
  },
  listContainer: {
    // justifyContent: 'center',
    marginLeft: spacing.medium_lg,
    marginRight: spacing.medium_lg,
    flex: 1,
  },
  slotContainer: {
    marginBottom: spacing.medium_lg
  },
  titleContainer: {
    paddingTop: spacing.medium_sm,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.medium_sm,
    marginBottom: spacing.medium_sm,
    backgroundColor: appTheme.darkBackground,
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular
  },
  addButtonContainer: {
    paddingTop: spacing.medium,
    paddingBottom: spacing.medium_sm,
    alignItems: 'center',
  }
});

const mapStateToProps = (state) => ({
  users: state.app.users
});

const mapDispatchToProps = (dispatch) => ({
  subscribePackage: (trainerId, packageId, time, days) => dispatch(actionCreators.subscribePackage(trainerId, packageId, time, days))
});

export default connect(mapStateToProps, mapDispatchToProps)(Enroll);

