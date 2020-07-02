/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {StyleSheet} from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {connect} from "react-redux";
import FastImage from 'react-native-fast-image'

import ProfileOverview from '../../components/Profile/ProfileOverview';

import {appTheme} from "../../constants/colors";
import {screenHeight, screenWidth} from '../../utils/screenDimensions';
import strings from "../../constants/strings";
import {userTypes} from "../../constants/appConstants";
import {getRandomImage} from "../../constants/images";
import RouteNames from "../../navigation/RouteNames";
import {generateTrainerHits, generateUserHits} from "../../utils/utils";

const STATUS_BAR_HEIGHT = 0;
const HEADER_HEIGHT = 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const defaultDP = 'https://media.istockphoto.com/photos/middle-aged-gym-coach-picture-id475467038';

class MyProfile extends Component {

  state = {
    bgImage: getRandomImage()
  }

  editProfile = () => {
    this.props.navigation.navigate(RouteNames.ProfileEdit);
  }

  renderContent = () => {
    const user = this.props.userData;

    let {name, userType, experience, rating, displayPictureUrl, city, bio, packages,slots} = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;
    const hits = userType === userTypes.TRAINER?
      generateTrainerHits({transformation:experience, slot:slots.length, program:packages.length }):
      generateUserHits({});
    return (
      <ProfileOverview
        name={name}
        dpUrl={displayPictureUrl}
        hits={hits}
        rating={rating}
        description={ !!bio?bio:strings.NO_DESC}
        profileType={userType}
        userType={userType}
        editCallback={this.editProfile}
        location={city}
      />
      // </View>
    )
  }

  render() {

    const {userData} = this.props;
    let {displayPictureUrl} = userData;
    // if (!displayPictureUrl) displayPictureUrl = defaultDP;

    return (
      <ParallaxScrollView
        backgroundColor={appTheme.darkBackground}
        contentBackgroundColor={appTheme.darkBackground}
        parallaxHeaderHeight={screenHeight * 2 / 3}
        renderForeground={() => (
          <FastImage
            style={{width: screenWidth, height: screenHeight}}
            // source={{
            //   uri: displayPictureUrl,
            //   priority: FastImage.priority.normal,
            // }}
            source={this.state.bgImage}
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
  userData: state.user.userData
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);