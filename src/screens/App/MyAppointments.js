import * as React from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {connect} from "react-redux";
import {SectionGrid} from 'react-native-super-grid';

import {spacing} from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {appTheme, darkPallet} from "../../constants/colors";
import Avatar from "../../components/Avatar";
import {getJoinDurationString, isSameDay, toTitleCase} from "../../utils/utils";
import RouteNames from "../../navigation/RouteNames";
import {defaultDP, WEEK_DAYS} from "../../constants/appConstants";
import * as actionCreators from "../../store/actions";
import AppointmentBox from "../../components/AppointmentBox";

class MyAppointments extends React.Component {

  state = {
    today: [],
    tomorrow: [],
    later: []
  }

  componentDidMount() {
    const {navigation, getAppointments} = this.props;

    this.unsubscribeFocus = navigation.addListener('focus', e => {
      getAppointments();
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
      else later.push(appointment);
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
    let name, displayPictureUrl;
    if (trainerId.name) {
      name = trainerId.name;
      displayPictureUrl = trainerId.displayPictureUrl;
    } else {
      name = userId.name;
      displayPictureUrl = userId.displayPictureUrl;
    }
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => this.openProfile(appointment.trainerId._id)}>
        <AppointmentBox
          date={appointmentDate}
          time={time}
          displayName={name}
          displayPictureUrl={displayPictureUrl}
        />
      </TouchableOpacity>
    )
  }

  renderAppointmentGrid = () => {
    return (
      <SectionGrid
        sections={[
          {
            title: 'Today',
            data: this.state.today
          },
          {
            title: 'Tomorrow',
            data: this.state.tomorrow,
          },
          {
            title: 'Later',
            data: this.state.later
          }
        ]}
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
