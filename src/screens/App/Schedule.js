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
import Appointment from "../../components/Appointment";
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
    const {globalSlots} = this.props;
    if (globalSlots) {
      const {times} = globalSlots;
      if (times && times.length > 0)
        this.setState({selectedTime: times[0]});
    }
  }

  onDateSelected = date => {
    this.setState({selectedDate: date});
  }

  selectTime = async time => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({selectedTime: stringToMilitaryTime(time)});
  }

  renderAppointments = (date) => {

    return this.state.appointments.map((appointment, index) => (
      <View key={index} style={styles.appointmentContainer}>
        <Appointment displayName={appointment.name} imageUrl={appointment.dpUrl} startTime={appointment.time}/>
      </View>
    ))
  }

  renderTimeButtonGroup = () => {
    return (
      <View style={styles.buttonGroup}>
        <SelectableButtonGroup
          data={formatTimeArray(this.props.globalSlots.times)}
          selected={militaryTimeToString(this.state.selectedTime)}
          onSelect={this.selectTime}
        />
      </View>
    )
  }

  getSelectedSlots = () => {
    const {selectedDate, selectedTime} = this.state;
    let dayIndex = (new Date(selectedDate)).getDay();
    let dayName = Object.keys(WEEK_DAYS)[dayIndex]
    // console.log(slots, dayName, selectedTime)
    const slotIndex = `${dayName}#${selectedTime}`;
    const selectedSlots = this.props.globalSlots.slots[slotIndex];
    // console.log(selectedSlots);


  }

  render() {
    this.getSelectedSlots();
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
          <Text style={styles.heading}>{strings.APPOINTMENTS}</Text>
        </View>
        <View style={styles.appointmentList}>
          {/*<View style={styles.appointmentContainer}>*/}
          {/*  <MiniSlotCard  day={'Su'} duration={60} startTime={'11:30 AM'}/>*/}
          {/*</View>*/}
          <this.renderAppointments/>
        </View>
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
  appointmentList: {},
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

//Code to enable disable specific days
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
