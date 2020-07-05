/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {connect} from "react-redux";
import {createImageProgress} from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';

const Image = createImageProgress(FastImage);
import ProfileOverview from '../../components/Profile/ProfileOverview';

import {appTheme} from "../../constants/colors";
import {screenHeight, screenWidth} from '../../utils/screenDimensions';
import strings from "../../constants/strings";
import {imageTypes, userTypes} from "../../constants/appConstants";
import {getRandomImage} from "../../constants/images";
import RouteNames from "../../navigation/RouteNames";
import {generateTrainerHits, generateUserHits, initialiseVideoCall, pickImage} from "../../utils/utils";
import {spacing} from "../../constants/dimension";
import TrainerInfo from "../../components/Trainer/TrainerInfoTabView";
import * as actionCreators from "../../store/actions";
import requestCameraAndAudioPermission from "../../utils/permission";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {uploadImage} from "../../API";

const STATUS_BAR_HEIGHT = 0;
const HEADER_HEIGHT = 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const defaultDP = 'https://media.istockphoto.com/photos/middle-aged-gym-coach-picture-id475467038';

class MyProfile extends Component {

  state = {
    bgImage: getRandomImage()
  }

  componentDidMount() {
    const {syncSubscriptions, updateUserData, userData, navigation} = this.props;
    this.unsubscribeFocus = navigation.addListener('focus', e => {
      updateUserData();
    })
    let {wallImageUrl} = userData;
    if (!!wallImageUrl) {
      this.setState({bgImage: {uri: wallImageUrl}});
    }
    syncSubscriptions();
    updateUserData();
  }

  componentWillUnmount() {
    this.unsubscribeFocus();
  }

  callClicked = async (userId) => {
    const permissionGranted = await requestCameraAndAudioPermission();

    if (permissionGranted) {
      await initialiseVideoCall(userId);
    } else console.log("Cant initiate video call without permission");
  }

  editProfile = () => {
    this.props.navigation.navigate(RouteNames.ProfileEdit);
  }

  editCover = () => {
    pickImage(async response => {
      if (!response.uri) return;
      console.log('image url', response.uri);
      this.setState({
        bgImage: {uri: response.uri},
      });

      await uploadImage(response.path, this.props.authToken, imageTypes.COVER);
    });
  }

  renderCoverEdit = () => (
    <TouchableOpacity
      hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}
      onPress={this.editCover} style={styles.coverEditButton}>
      <FontAwesome
        name={'camera'}
        color={'white'}
        size={20}
      />
      <Text style={styles.coverText}>{strings.EDIT_COVER}</Text>
    </TouchableOpacity>
  )

  renderContent = () => {
    const user = this.props.userData;

    let {name, userType, experience, rating, displayPictureUrl, city, bio, packages, slots} = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;
    const hits = userType === userTypes.TRAINER ?
      generateTrainerHits({transformation: experience, slot: slots.length, program: packages.length}) :
      generateUserHits({});
    return (
      <>
        <ProfileOverview
          name={name}
          dpUrl={displayPictureUrl}
          hits={hits}
          rating={rating}
          description={!!bio ? bio : strings.NO_DESC}
          profileType={userType}
          userType={userType}
          editCallback={this.editProfile}
          location={city}
        />
        {
          userType === userTypes.TRAINER && (
            <View style={{flex: 1, marginTop: spacing.medium_lg}}>
              <TrainerInfo
                packages={packages}
                slots={slots}
                enrollCallback={this.enrollClicked}
                subscriptions={this.props.subscriptions}
                callCallback={this.callClicked}
              />
            </View>
          )
        }
      </>
    )
  }

  render() {
    return (
      <ParallaxScrollView
        backgroundColor={appTheme.background}
        contentBackgroundColor={appTheme.background}
        parallaxHeaderHeight={screenHeight * 2 / 3}
        renderForeground={() => (
          <>
            <this.renderCoverEdit/>
            <Image
              style={{width: screenWidth, height: screenHeight}}
              source={this.state.bgImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          </>
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
    backgroundColor: appTheme.background,
  },
  contentContainer: {
  },

  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  coverEditButton: {
    position: 'absolute',
    left: spacing.medium_lg,
    bottom: spacing.large_lg,
    zIndex: 100,
    flexDirection: 'row',
    backgroundColor: '#11111188',
    padding: spacing.small,
    borderRadius: 3
  },
  coverText: {
    color: 'white',
    marginLeft: spacing.medium_sm
  }
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  subscriptions: state.trainer.subscriptions,
  authToken: state.user.authToken,
});

const mapDispatchToProps = (dispatch) => ({
  syncSubscriptions: () => dispatch(actionCreators.syncSubscriptions()),
  updateUserData: () => dispatch(actionCreators.updateUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);