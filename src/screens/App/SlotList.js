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
import {appTheme, darkPallet} from "../../constants/colors";
import strings from "../../constants/strings";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";

import {WEEK_DAYS} from "../../constants/appConstants";
import Slot from "../../components/Slot";
import {dateToString, findMissingDays, groupBy} from "../../utils/utils";
import BarButton from "../../components/BarButton";
import LinearGradient from "react-native-linear-gradient";

class SlotList extends Component {

  state = {
    slots: []
  }

  componentDidMount() {
    const {navigation, createSlots, slots} = this.props;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.refreshSlots();
    this.unsubscribeFocus = navigation.addListener('focus', e => {
      this.refreshSlots(); // TODO:Make it fire only for first time
    })

    this.unsubscribeBlur = navigation.addListener('blur', async e => {
      await createSlots(this.state.slots);
      this.refreshSlots();
    });
  }

  refreshSlots = () => {
    const {slots} = this.props;
    if (slots && slots.length > 0) {
      // const filteredSlots = slots.filter(slot=>slot.subscriptionId===null);
      const localSlots = this.mapSlotsToLocal(slots);
      this.setState({slots: localSlots});
    }
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

  componentWillUnmount() {
    this.unsubscribeFocus();
    this.unsubscribeBlur();
  }

  updateSlot = (slotId, updatedSlot) => {
    let slots = this.state.slots.map(slot => slot._id === slotId ? updatedSlot : slot);
    this.setState({slots});
  }
  getSlot = (slotId) => {
    const filteredSlots = this.state.slots.filter(slot => slot._id === slotId);
    if (filteredSlots.length === 0)
      return null;
    return {...filteredSlots[0]};
  }
  handleTimeChange = (slotId, time) => {
    const slot = this.getSlot(slotId);
    slot.time = dateToString(time);
    this.updateSlot(slotId, slot);
  }
  handleDurationChange = (slotId, duration) => {
    const slot = this.getSlot(slotId);
    slot.duration = duration;
    this.updateSlot(slotId, slot);
  }
  handleDaysChange = (slotId, days) => {
    const slot = this.getSlot(slotId);
    slot.days = days;
    this.updateSlot(slotId, slot);
  }
  deleteSlot = (slotId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const filteredSlots = this.state.slots.filter(slot => slot._id !== slotId);
    this.setState({slots: filteredSlots});
    this.props.createSlots(filteredSlots);

  }
  createSlot = () => {
    const slot = {
      _id: cuid(),
      duration: 60,
      time: '1000',
      days: [WEEK_DAYS.MON, WEEK_DAYS.TUE, WEEK_DAYS.WED]
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const slots = [...this.state.slots];
    slots.push(slot);
    this.setState({slots});
  }

  renderSlots = () => {
    return this.state.slots.map((slot, index) => (
      <View key={slot._id} style={styles.slotContainer}>
        <Slot
          days={slot.days}
          duration={slot.duration}
          index={index + 1}
          time={slot.time}
          onTimeChange={(time) => this.handleTimeChange(slot._id, time)}
          onDurationChange={duration => this.handleDurationChange(slot._id, duration)}
          onDaysChange={days => this.handleDaysChange(slot._id, days)}
          onDelete={() => this.deleteSlot(slot._id)}
        />
      </View>
    ))
  }

  render() {
    return (
      <LinearGradient
        colors={[darkPallet.darkBlue, darkPallet.extraDarkBlue]}
        style={styles.container}>
      <KeyboardAwareScrollView style={styles.container}>
        <StatusBar backgroundColor={appTheme.darkBackground}/>
        <View style={styles.listContainer}>
          <this.renderSlots/>
        </View>
        <View style={styles.addButtonContainer}>
          <BarButton onPress={this.createSlot}/>
        </View>
      </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: appTheme.background,
  },
  listContainer: {
    justifyContent: 'center',
    marginTop:spacing.medium_lg,
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
    // backgroundColor: appTheme.background,
    alignItems: 'center',

  }
});

const mapStateToProps = (state) => ({
  slots: state.trainer.slots
});

const mapDispatchToProps = (dispatch) => ({
  createSlots: (slotArray) => dispatch(actionCreators.createSlots(slotArray)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlotList);