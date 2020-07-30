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
import strings from "../../constants/strings";

class CallRequests extends PureComponent {

  state = {
    today: [],
    tomorrow: [],
    later: []
  }

  componentDidMount() {
    const {navigation, getRequests} = this.props;

    this.unsubscribeFocus = navigation.addListener('focus', async e => {
      await getRequests();
      this.groupRequests();
    })
    this.groupRequests();
  }

  groupRequests = () => {
    const {requests} = this.props;
    const todayDate = new Date();
    const tomorrowDate = new Date();
    const today = [], tomorrow = [], later = [];
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    requests.map(request => {
      if (isSameDay(todayDate, new Date(request.appointmentDate)))
        today.push(request);
      else if (isSameDay(tomorrowDate, new Date(request.appointmentDate)))
        tomorrow.push(request);
      else if (todayDate > new Date(request.appointmentDate)) {
        //take no action for now
      } else
        later.push(request);
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
  renderRequest = (request) => {
    const {appointmentDate, time, trainerId, userId} = request;
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

  renderRequestGrid = () => {
    const sections = this.getSections();
    if (sections.length === 0)
      return (
        <View style={{marginTop: spacing.large_lg}}>
          {this.renderSectionHeader(strings.NO_REQUESTS)}
        </View>
      )
    return (
      <SectionGrid
        sections={sections}
        style={{width: '100%'}}
        renderItem={({item}) => this.renderRequest(item)}
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
        {this.renderRequestGrid()}
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
  requests: state.user.myAppointments,
});

const mapDispatchToProps = (dispatch) => ({
  getRequests: () => dispatch(actionCreators.getAppointments())
});

export default connect(mapStateToProps, mapDispatchToProps)(CallRequests);
