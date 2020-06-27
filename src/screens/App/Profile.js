/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {connect} from "react-redux";
import FastImage from 'react-native-fast-image'

import ProfileOverview from '../../components/Profile/ProfileOverview';
import RouteNames from "../../navigation/RouteNames";
import * as actionCreators from '../../store/actions';
import Splash from "../Auth/Splash";
import requestCameraAndAudioPermission from "../../utils/permission";
import {initialiseVideoCall} from "../../utils/utils";
import {appTheme} from "../../constants/colors";
import {screenHeight, screenWidth} from '../../utils/screenDimensions';

const STATUS_BAR_HEIGHT = 0;
const HEADER_HEIGHT = 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const defaultDP = 'https://media.istockphoto.com/photos/middle-aged-gym-coach-picture-id475467038';

class Profile extends Component {

  componentDidMount() {
    const {route, setUser} = this.props;
    const {userId} = route.params;
    setUser(userId);
  }

  enrollClicked = () => {
    const {navigation, route} = this.props;
    const {userId} = route.params;
    navigation.navigate(RouteNames.Packages, {
      userId
    });
  }

  callClicked = async () => {
    const {route} = this.props;
    const {userId} = route.params;
    const permissionGranted = await requestCameraAndAudioPermission();

    if (permissionGranted) {
      await initialiseVideoCall(userId);
    } else console.log("Cant initiate video call without permission");
  }

  renderContent = () => {
    const {route, users} = this.props;

    const {userId} = route.params;
    const user = users[userId];
    if (!user) return (
      <View style={styles.container}/>
    )
    let {name, userType, experience, rating, displayPictureUrl} = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;

    return (
      // <View style={styles.container}>
      <ProfileOverview
        name={name}
        dpUrl={displayPictureUrl}
        hits={{
          transformations: experience,
          programs:4
          // followers: 0,
          // following: 0
        }}
        rating={rating}
        description={"No description provided for this user"}
        profileType={userType}
        enrollCallback={this.enrollClicked}
        initiateVideoCallCallback={this.callClicked}
        userType={userType}
      />
      // </View>
    )
  }

  render() {
    const {route, users} = this.props;

    const {userId} = route.params;
    const user = users[userId];
    if (!user) return <Splash/>;
    let {displayPictureUrl} = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;


    return (
      <ParallaxScrollView
        backgroundColor={appTheme.darkBackground}
        contentBackgroundColor={appTheme.darkBackground}
        parallaxHeaderHeight={screenHeight * 2 / 3}

        renderForeground={() => (
          <FastImage
            style={{width: screenWidth, height: screenHeight}}
            source={{
              uri: defaultDP,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}>
        <this.renderContent/>
      </ParallaxScrollView>

    )
    return (
      <this.renderContent/>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.darkBackground,
    padding: 0,

    margin: 0
    // flex: 1,
    // backgroundColor: 'transparent'
  },
  contentContainer: {
    // flexGrow: 1,
  },
  navContainer: {
    height: HEADER_HEIGHT,
    // alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    // backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const mapStateToProps = (state) => ({
  trainers: state.app.trainers,
  users: state.app.users
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (userId) => dispatch(actionCreators.setUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);