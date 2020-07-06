/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, LayoutAnimation} from 'react-native'
import {createImageProgress} from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';

const Image = createImageProgress(FastImage);
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {connect} from "react-redux";

import ProfileOverview from '../../components/Profile/ProfileOverview';
import TrainerInfo from '../../components/Trainer/TrainerInfoTabView'
import RouteNames, {TabRoutes} from "../../navigation/RouteNames";
import * as actionCreators from '../../store/actions';
import requestCameraAndAudioPermission from "../../utils/permission";
import {generateTrainerHits, generateUserHits, initialiseVideoCall} from "../../utils/utils";
import {appTheme} from "../../constants/colors";
import {screenHeight, screenWidth} from '../../utils/screenDimensions';
import strings from "../../constants/strings";
import {userTypes} from "../../constants/appConstants";
import {getRandomImage} from "../../constants/images";
import {spacing} from "../../constants/dimension";
import {showError, showSuccess} from "../../utils/notification";
import {bookAppointment} from "../../API";


const STATUS_BAR_HEIGHT = 0;
const HEADER_HEIGHT = 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const defaultDP = 'https://media.istockphoto.com/photos/middle-aged-gym-coach-picture-id475467038';

class Profile extends Component {

  state = {
    bgImage: getRandomImage()
  }

  componentDidMount() {
    const {route, setUser} = this.props;
    const {userId} = route.params;

    setUser(userId);

    const userData = this.getUser();
    if (userData) {
      let {wallImageUrl} = userData;
      if (!!wallImageUrl) {
        this.setState({bgImage: {uri: wallImageUrl}});
      }
    }

  }

  enrollClicked = (packageId) => {
    const {navigation, route} = this.props;
    const {userId} = route.params;
    const user = this.getUser();

    let {name, packages} = user;
    const filteredPackages = packages.filter(packageData => packageData._id === packageId);
    if (filteredPackages && filteredPackages.length > 0) {
      const sessionCount = filteredPackages[0].noOfSessions;
      navigation.navigate(RouteNames.Enroll, {
        userId,
        packageId,
        trainerName: name,
        sessionCount
      });
    }
  }

  callClicked = async () => {
    const {route} = this.props;
    const {userId} = route.params;
    const permissionGranted = await requestCameraAndAudioPermission();

    if (permissionGranted) {
      await initialiseVideoCall(userId);
    } else console.log("Cant initiate video call without permission");
  }

  bookAppointment = async (day, time) => {
    const {route,setUser} = this.props;
    const {userId} = route.params;
    let response = await bookAppointment(userId, day, time);
    if (response.success)
      showSuccess(response.message);
    else showError(response.message);
    setUser(userId);
  }

  loader = () => (
    <View style={styles.contentContainer}>
      <ActivityIndicator color={appTheme.lightContent} size={50}/>
    </View>
  )

  getUser = () => {
    const {route, users} = this.props;
    const {userId} = route.params;
    return users[userId];
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const {route, users} = nextProps;
    const {userId} = route.params;
    const nextUser = users[userId];
    const currentUser = this.getUser();

    if (nextUser && !currentUser) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // fancy hack
      let {wallImageUrl} = nextUser;
      if (!!wallImageUrl) {
        this.setState({bgImage: {uri: wallImageUrl}});
      }
    }
    return true;
  }

  renderContent = () => {
    const {route} = this.props;
    const {initialRouteName = TabRoutes.Packages} = route.params;
    const user = this.getUser();
    if (!user)
      return this.loader();

    let {name, userType, experience, rating, displayPictureUrl, packages, city, bio, slots} = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;
    const hits = userType === userTypes.TRAINER ?
      generateTrainerHits({transformation: experience, slot: slots.length, program: packages.length}) :
      generateUserHits({});
    return (
      <View style={styles.container}>
        <ProfileOverview
          name={name || 'User'}
          dpUrl={displayPictureUrl}
          hits={hits}
          rating={rating}
          description={!!bio ? bio : strings.NO_DESC}
          profileType={userType}
          initiateVideoCallCallback={this.callClicked}
          userType={userType}
          location={city}
        />
        {
          userType === userTypes.TRAINER && (
              <TrainerInfo
                packages={packages}
                slots={slots}
                enrollCallback={this.enrollClicked}
                bookCallback={this.bookAppointment}
                initialRouteName={initialRouteName}
              />
          )
        }
      </View>
    )
  }

  render() {
    return (
      <ParallaxScrollView
        backgroundColor={appTheme.background}
        contentBackgroundColor={appTheme.lightBackground}
        parallaxHeaderHeight={screenHeight * 2 / 3}
        renderForeground={() => (
          <Image
            style={{width: screenWidth, height: screenHeight}}
            source={this.state.bgImage}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}>
        <this.renderContent/>
      </ParallaxScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: screenHeight / 3
  },

  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const mapStateToProps = (state) => ({
  users: state.app.users,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (userId) => dispatch(actionCreators.setUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);