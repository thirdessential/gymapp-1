/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, FlatList, StatusBar, Text, TextInput, TouchableOpacity} from 'react-native'
import {connect} from "react-redux";

import {spacing} from "../../constants/dimension";
import * as actionCreators from "../../store/actions";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import colors, {appTheme} from "../../constants/colors";
import strings from "../../constants/strings";
import Ion from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import WeekdayPicker from "react-native-weekday-picker"

import {WEEK_DAYS} from "../../constants/appConstants";
import Slot from "../../components/Slot";
import {dateToString} from "../../utils/utils";

class SlotList extends Component {

  state = {
    editId: 'sdaa',
    slots: [
      {
        id: 'sda',
        duration: 60,
        time: '1130',
        days: [WEEK_DAYS.MON, WEEK_DAYS.THU, WEEK_DAYS.SAT]
      },
      {
        id: 'sdaa',
        duration: 30,
        time: '1030',
        days: [WEEK_DAYS.MON, WEEK_DAYS.TUE, WEEK_DAYS.SAT]
      },
      {
        id: 'sdss',
        duration: 60,
        time: '1600',
        days: [WEEK_DAYS.TUE, WEEK_DAYS.WED, WEEK_DAYS.FRI, WEEK_DAYS.SAT]
      },
      {
        id: 'sdassa',
        duration: 60,
        time: '1130',
        days: [...Object.values(WEEK_DAYS)]
      }
    ],
  }

  updateSlot = (slotId, updatedSlot) => {
    let slots = this.state.slots.map(slot => slot.id === slotId ? updatedSlot : slot);
    this.setState({slots});
  }

  getSlot = (slotId) => {
    const filteredSlots = this.state.slots.filter(slot => slot.id === slotId);
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
    this.updateSlot(slotId,slot);
  }
  handleDaysChange = (slotId, days) => {
    const slot = this.getSlot(slotId);
    slot.days = days;
    this.updateSlot(slotId,slot);
  }

  renderSlots = () => {
    return this.state.slots.map((slot,index) => (
      <View key={slot.id} style={styles.slotContainer}>
        <Slot
          days={slot.days}
          duration={slot.duration}
          index={index+1}
          time={slot.time}
          onTimeChange={(time) => this.handleTimeChange(slot.id, time)}
          onDurationChange={duration => this.handleDurationChange(slot.id, duration)}
          onDaysChange={days => this.handleDaysChange(slot.id, days)}
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
    // marginTop:60
  },
  listContainer: {
    justifyContent: 'center',
    marginLeft: spacing.medium_lg,
    marginRight: spacing.medium_lg,
  },
  slotContainer: {
    marginBottom: spacing.large
  },
  titleContainer: {
    paddingTop: spacing.medium_sm,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.medium_sm,
    marginBottom:spacing.medium_lg,
    backgroundColor: appTheme.darkBackground,
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SlotList);