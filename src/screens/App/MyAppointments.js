import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {SectionGrid} from 'react-native-super-grid';

import {spacing} from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {appTheme,} from "../../constants/colors";
import {isSameDay} from "../../utils/utils";
import RouteNames from "../../navigation/RouteNames";
import * as actionCreators from "../../store/actions";
import AppointmentBox from "../../components/AppointmentBox";

class MyAppointments extends PureComponent {

  state = {
    today: [],
    tomorrow: [],
    later: []
  }

  componentDidMount() {
    const {navigation, getAppointments} = this.props;

    this.unsubscribeFocus = navigation.addListener('focus', async e => {
      await getAppointments();
      this.groupAppointments();
    })
    this.groupAppointments();
  }

  groupAppointments = () => {
    const {myAppointments} = this.props;
    const todayDate = new Date();
    const tomorrowDate = new Date();
    const today = [], tomorrow = [], later = [];
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    myAppointments.map(appointment => {
      if (isSameDay(todayDate, new Date(appointment.appointmentDate)))
        today.push(appointment);
      else if (isSameDay(tomorrowDate, new Date(appointment.appointmentDate)))
        tomorrow.push(appointment);
      else if (todayDate > new Date(appointment.appointmentDate)) {
        //take no action for now
      } else
        later.push(appointment);
    });
    this.setState({
      today, tomorrow, later
    })
  }

  componentWillUnmount() {
    this.unsubscribeFocus();
  }

  openProfile = (userId) => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.Profile, {
      userId: userId,
    });
  }
  renderSectionHeader = (title) => {
    return <Text style={styles.title}>{title}</Text>;
  }
  renderAppointment = (appointment) => {
    const {appointmentDate, time, trainerId, userId} = appointment;
    let name, displayPictureUrl, profileId;
    if (trainerId.name) {
      name = trainerId.name;
      displayPictureUrl = trainerId.displayPictureUrl;
      profileId = trainerId._id;
    } else {
      name = userId.name;
      displayPictureUrl = userId.displayPictureUrl;
      profileId = userId._id;
    }
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => this.openProfile(profileId)}>
        <AppointmentBox
          date={appointmentDate}
          time={time}
          displayName={name}
          displayPictureUrl={displayPictureUrl}
        />
      </TouchableOpacity>
    )
  }

  getSections = () => {
    let sections = [];
    if (this.state.today.length > 0) sections.push({
      title: 'Today',
      data: this.state.today
    });
    if (this.state.tomorrow.length > 0) sections.push({
      title: 'Tomorrow',
      data: this.state.tomorrow,
    })
    if (this.state.later.length > 0) sections.push({
      title: 'Later',
      data: this.state.later
    })
    return sections;
  }

  renderAppointmentGrid = () => {
    const sections = this.getSections();
    if (sections.length === 0)
      return (
        <View style={{marginTop: spacing.large_lg}}>
          {this.renderSectionHeader('No appointments found')}
        </View>
      )
    return (
      <SectionGrid
        sections={sections}
        style={{width: '100%'}}
        renderItem={({item}) => this.renderAppointment(item)}
        renderSectionHeader={({section}) => this.renderSectionHeader(section.title)}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <View style={{marginTop: spacing.medium_sm}}/>}
      />
    )
  }

  render() {
    return (
      <View
        style={styles.container}>

        {this.renderAppointmentGrid()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingLeft: spacing.medium_sm,
    paddingRight: spacing.medium_sm,
    alignItems: "center",
    backgroundColor: appTheme.background,
  },
  titleContainer: {
    marginTop: spacing.medium_sm,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothic,
    marginLeft: spacing.medium_sm
  },
  displayName: {
    color: 'white',
    fontSize: fontSizes.h1,
    fontFamily: fonts.MontserratMedium,
  },
  infoText: {
    color: appTheme.lightContent,
    fontSize: fontSizes.h2,
    fontFamily: fonts.MontserratMedium,
  },
  listContainer: {
    width: '100%'
  },
  userContainer: {
    width: '100%',
    alignItems: 'center'
  },
  editButton: {
    marginLeft: spacing.medium_sm,
    padding: spacing.small,
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  myAppointments: state.user.myAppointments,
});

const mapDispatchToProps = (dispatch) => ({
  getAppointments: () => dispatch(actionCreators.getAppointments())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAppointments);
