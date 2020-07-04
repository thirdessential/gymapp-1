/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, ScrollView, LayoutAnimation} from 'react-native';
import {connect} from "react-redux";
import moment from "moment";
import {Card} from 'native-base';

import {spacing} from "../../constants/dimension";
import * as actionCreators from "../../store/actions";
import CustomCalendar from '../../components/customCalendar';
import GlobalSlot from "../../components/GlobalSlot";
import {appTheme} from "../../constants/colors";

import SelectableButtonGroup from '../../components/selectableButtonGroup';
import strings from "../../constants/strings";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import MiniSlotCard from "../../components/MiniSlotCard";
import {formatTimeArray, militaryTimeToString, stringToMilitaryTime} from "../../utils/utils";
import {WEEK_DAYS} from "../../constants/appConstants";

class Schedule extends Component {

  state = {
    selectedDate: Date.now(),
    selectedSlots: [],
    selectedTime: null,
    appointments: [{
      name: 'Jane Nikalson',
      dpUrl: 'https://i.pinimg.com/originals/c5/a9/5f/c5a95f05b14e7f35abd07adf80bc3482.jpg',
      time: '11:00 am'
    }, {
      name: 'Jane Nikalson',
      dpUrl: 'https://i.pinimg.com/originals/c5/a9/5f/c5a95f05b14e7f35abd07adf80bc3482.jpg',
      time: '11:00 am'
    }, {
      name: 'Jane Nikalson',
      dpUrl: 'https://i.pinimg.com/originals/c5/a9/5f/c5a95f05b14e7f35abd07adf80bc3482.jpg',
      time: '11:00 am'
    }, {
      name: 'Jane Nikalson',
      dpUrl: 'https://i.pinimg.com/originals/c5/a9/5f/c5a95f05b14e7f35abd07adf80bc3482.jpg',
      time: '11:00 am'
    }]
  }

  componentDidMount() {

    const {navigation} = this.props;
    this.refreshGlobalState();
    this.updateLocalState();
    this.unsubscribe = navigation.addListener('focus', e => {
      this.refreshGlobalState();
    });
  }

  getSelectedDay = () => {
    const date = new Date(this.state.selectedDate);
    return Object.keys(WEEK_DAYS)[date.getDay()];
  }

  refreshGlobalState = async () => {
    const {updateGlobalSlots} = this.props;
    await updateGlobalSlots();
    this.updateLocalState();
  }

  updateLocalState = () => {
    const {globalSlots} = this.props;

    if (globalSlots) {
      this.updateSelectedTime();
    }
  }

  updateSelectedTime = () => {
    const {globalSlots} = this.props;

    const day = this.getSelectedDay();
    const {times} = globalSlots[day][0];
    if (times && times.length > 0)
      this.setState({selectedTime: times[0]})
  }

  onDateSelected = async date => {
    await this.setState({selectedDate: date});
    this.updateSelectedTime();
  }

  selectTime = async time => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({selectedTime: stringToMilitaryTime(time)});
  }

  renderSlots = () => {
    const {globalSlots} = this.props;
    const day = this.getSelectedDay();
    const {slots} = globalSlots[day][0];
    const filteredSlots = slots.filter(slot => slot.time === this.state.selectedTime);
    return filteredSlots.map((slot, index) => {
      const {duration, trainerId} = slot;
      const {name ,displayPictureUrl, city} = trainerId;
      return (
        <View key={index} style={styles.appointmentContainer}>
          <GlobalSlot
            displayName={name}
            imageUrl={displayPictureUrl}
            location={city}
            duration={duration}/>
        </View>
      )
    })
  }

  renderTimeButtonGroup = () => {
    const {globalSlots} = this.props;
    const day = this.getSelectedDay();
    const {times} = globalSlots[day][0];
    return (
      <View style={styles.buttonGroup}>
        <SelectableButtonGroup
          data={formatTimeArray(times)}
          selected={militaryTimeToString(this.state.selectedTime)}
          onSelect={this.selectTime}
        />
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.calendarContainer}>
          <CustomCalendar
            selectedDate={this.state.selectedDate}
            dates={this.state.dates}
            onDateChange={this.onDateSelected}
          />
        </View>
        <this.renderTimeButtonGroup/>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{strings.AVAILABLE_SLOTS}</Text>
        </View>
        {/*<View style={styles.slotList}>*/}
          <this.renderSlots/>
        {/*</View>*/}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.lightBackground
  },
  calendarContainer: {
    paddingLeft: spacing.medium_lg,
    paddingRight: spacing.medium_lg,
    backgroundColor: appTheme.background
  },
  slotList: {},
  appointmentContainer: {
    marginLeft: spacing.medium_sm,
    marginRight: spacing.medium_sm
  },
  buttonGroup: {
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
    marginTop: spacing.large
  },
  headingContainer: {
    margin: spacing.medium,
    marginBottom:spacing.small,
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: fontSizes.h1,
    fontFamily: fonts.PoppinsMedium
  }
});

const mapStateToProps = (state) => ({
  globalSlots: state.app.globalSlots
});

const mapDispatchToProps = (dispatch) => ({
  updateGlobalSlots: () => dispatch(actionCreators.updateGlobalSlots())
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

//Code to enable disable specific days, wip
// if (days && days.length > 0) {
// let validDates = [];
// days.map(day => {
//
//   const start = moment(),
//     end = moment().add(35, 'days'),
//     dayToInt = Object.keys(WEEK_DAYS).indexOf(day);
//   const current = start.clone();
//   while (current.day(7 + dayToInt).isBefore(end)) {
//     validDates.push(current.clone());
//   }
// })
// validDates.sort((d1,d2)=> d1>d2);
// console.log(validDates.map(m => m.format('LLLL')));
// console.log(validDates.length)
// this.setState({dates:validDates});
// }
