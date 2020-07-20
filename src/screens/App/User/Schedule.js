/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {View, StyleSheet, Text, ScrollView, LayoutAnimation, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";

import {spacing} from "../../../constants/dimension";
import * as actionCreators from "../../../store/actions";
import CustomCalendar from '../../../components/customCalendar';
import GlobalSlot from "../../../components/GlobalSlot";
import {appTheme, darkPallet} from "../../../constants/colors";

import SelectableButtonGroup from '../../../components/selectableButtonGroup';
import strings from "../../../constants/strings";
import fontSizes from "../../../constants/fontSizes";
import fonts from "../../../constants/fonts";
import {formatTimeArray, militaryTimeToString, stringToMilitaryTime} from "../../../utils/utils";
import {defaultDP, WEEK_DAYS} from "../../../constants/appConstants";
import {bookAppointment} from "../../../API";
import {showError, showSuccess} from "../../../utils/notification";
import RouteNames from "../../../navigation/RouteNames";

class Schedule extends PureComponent {
  state = {
    selectedDate: Date.now(),
    selectedSlots: [],
    selectedTime: null,
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

    if (globalSlots && Object.keys(globalSlots).length > 0) {
      this.updateSelectedTime();
    }
  }

  updateSelectedTime = () => {
    const {globalSlots} = this.props;
    if (!globalSlots) return;

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

  bookAppointment = async (trainerId, day, time) => {
    let response = await bookAppointment(trainerId, day, time, this.state.selectedDate);
    if (response.success)
      showSuccess(response.message);
    else showError(response.message);
  }

  openProfile = (userId) => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.Profile, {
      userId: userId
    });
  }

  getUser = (userId) => {
    const {users, setUser} = this.props;
    const user = users[userId];
    if (!user) {
      setUser(userId);
      return {};
    }
    return user;
  }

  renderSlots = () => {
    const {globalSlots} = this.props;
    if (!globalSlots) return null;
    const day = this.getSelectedDay();
    if (!globalSlots[day]) return null;
    const {slots} = globalSlots[day][0];
    if (!slots) return null;
    const filteredSlots = slots.filter(slot => slot.time === this.state.selectedTime);
    return filteredSlots.map((slot, index) => {
      const {duration, trainerId, dayOfWeek, time} = slot;
      let {name, displayPictureUrl, city} = this.getUser(trainerId);
      if (!displayPictureUrl) displayPictureUrl = defaultDP;
      return (
        <TouchableOpacity
          onPress={() => this.openProfile(trainerId)}
          activeOpacity={0.8}
          key={index}
          style={styles.appointmentContainer}>
          <GlobalSlot
            displayName={name}
            imageUrl={displayPictureUrl}
            location={city}
            duration={duration}
            bookCallback={() => this.bookAppointment(trainerId, dayOfWeek, time)}
          />
        </TouchableOpacity>
      )
    })
  }

  renderTimeButtonGroup = () => {
    const {globalSlots} = this.props;
    if (!globalSlots || Object.keys(globalSlots).length === 0) return null;
    const day = this.getSelectedDay();
    const {times} = globalSlots[day] && globalSlots[day][0];
    if (!times) return null;
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
      <LinearGradient
        colors={[darkPallet.darkBlue, appTheme.lightBackground]}
        style={styles.container}>
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
          <this.renderSlots/>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: appTheme.lightBackground
    flex: 1
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
    marginBottom: spacing.small,
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: fontSizes.h1,
    fontFamily: fonts.PoppinsMedium
  }
});

const mapStateToProps = (state) => ({
  globalSlots: state.app.globalSlots,
  users: state.app.users
});

const mapDispatchToProps = (dispatch) => ({
  updateGlobalSlots: () => dispatch(actionCreators.updateGlobalSlots()),
  setUser: (userId) => dispatch(actionCreators.setUser(userId)),
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
