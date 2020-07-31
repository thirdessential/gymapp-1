import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {FlatGrid, SectionGrid} from 'react-native-super-grid';

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

  componentDidMount() {
    const {getCallbacks} = this.props;
    getCallbacks();
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

  renderRequestGrid = () => {
    const {callbacks} = this.props;
    if (callbacks.length === 0)
      return (
        <View style={{marginTop: spacing.large_lg}}>
          {this.renderSectionHeader(strings.NO_REQUESTS)}
        </View>
      )
    return (
      <FlatGrid
        style={{width: '100%'}}
        renderItem={({item}) => this.renderRequest(item)}
        renderSectionHeader={({section}) => this.renderSectionHeader(section.title)}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <View style={{marginTop: spacing.medium_sm}}/>}
       data={[]}/>
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
    // alignItems: "center",
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
  callbacks: state.trainer.callbacks || [],
});

const mapDispatchToProps = (dispatch) => ({
  getCallbacks: () => dispatch(actionCreators.getCallbacks()),
  acceptCallBack: (id) => dispatch(actionCreators.acceptCallBack(id)),
  rejectCallback: (id) => dispatch(actionCreators.rejectCallback(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CallRequests);
