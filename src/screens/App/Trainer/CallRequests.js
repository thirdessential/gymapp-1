import React, {PureComponent} from 'react';
import {FlatList, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {FlatGrid, SectionGrid} from 'react-native-super-grid';

import {spacing} from "../../../constants/dimension";
import fontSizes from "../../../constants/fontSizes";
import fonts from "../../../constants/fonts";
import {appTheme,} from "../../../constants/colors";
import {initialiseVideoCall, isSameDay} from "../../../utils/utils";
import RouteNames from "../../../navigation/RouteNames";
import * as actionCreators from "../../../store/actions";
import CallbackBox from "../../../components/CallbackBox";
import strings from "../../../constants/strings";
import {call} from "react-native-reanimated";
import {requestCameraAndAudioPermission} from "../../../utils/permission";

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

  rejectRequest = (requestId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.rejectCallback(requestId)
  }
  acceptRequest = (requestId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.acceptCallback(requestId);
  }
  requestFulfilled = (requestId)=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.callbackDone(requestId);
  }
  initiateCall = async (userId) => {
    const permissionGranted = await requestCameraAndAudioPermission();
    if (permissionGranted) {
      await initialiseVideoCall(userId);
    } else console.log("Cant initiate video call without permission");
  }

  renderRequest = (request) => {
    const {createdOn, status, userId: userData, _id: requestId} = request;
    const {name, city, displayPictureUrl, _id: userId} = userData;
    return (
      <CallbackBox
        date={createdOn}
        city={city}
        displayName={name+name}
        displayPictureUrl={displayPictureUrl}
        status={status}
        openProfile={() => this.openProfile(userId)}
        rejectRequest={() => this.rejectRequest(requestId)}
        acceptRequest={() => this.acceptRequest(requestId)}
        call={() => this.initiateCall(userId)}
        done={()=>this.requestFulfilled(requestId)}
      />
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
      <FlatList
        style={{width: '100%'}}
        renderItem={({item}) => this.renderRequest(item)}
        renderSectionHeader={({section}) => this.renderSectionHeader(section.title)}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <View style={{marginTop: spacing.medium_sm}}/>}
        data={callbacks}
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
  acceptCallback: (id) => dispatch(actionCreators.acceptCallback(id)),
  rejectCallback: (id) => dispatch(actionCreators.rejectCallback(id)),
  callbackDone: (id) => dispatch(actionCreators.callbackDone(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CallRequests);
