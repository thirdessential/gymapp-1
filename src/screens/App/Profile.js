/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, LayoutAnimation, Text} from 'react-native'
import {createImageProgress} from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';

const Image = createImageProgress(FastImage);
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {connect} from "react-redux";

import ProfileOverview from '../../components/Profile/ProfileOverview';
import TrainerInfo from '../../components/Trainer/TrainerInfoTabView'
import RouteNames, {TabRoutes} from "../../navigation/RouteNames";
import * as actionCreators from '../../store/actions';
import {requestCameraAndAudioPermission} from "../../utils/permission";
import {generateTrainerHits, generateUserHits, initialiseVideoCall} from "../../utils/utils";
import {appTheme} from "../../constants/colors";
import {screenHeight, screenWidth} from '../../utils/screenDimensions';
import strings from "../../constants/strings";
import {defaultDP, INITIAL_PAGE, userTypes} from "../../constants/appConstants";
import {getRandomImage} from "../../constants/images";
import {spacing} from "../../constants/dimension";
import {showError, showSuccess} from "../../utils/notification";
import {bookAppointment, likePost, reportPost, unlikePost} from "../../API";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import PostList from "../../components/Social/PostList";

class Profile extends Component {

  state = {
    bgImage: getRandomImage(),
    nextPage: INITIAL_PAGE
  }

  componentDidMount() {
    const {route, setUser, getPostsForUser} = this.props;
    const {userId} = route.params;

    setUser(userId);
    getPostsForUser(userId);

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
    const {route, setUser} = this.props;
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
  getPosts = () => {
    const {route, postsForUser} = this.props;
    const {userId} = route.params;
    if( postsForUser[userId])
      return postsForUser[userId];
    return [];
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
  openPost = (postId) => {
    this.props.navigation.navigate(RouteNames.PostViewer, {postId});
  }
  updatePosts = async () => {
    const {getPostsForUser} = this.props;
    const {nextPage} = this.state;
    if (!!nextPage)
      this.setState({nextPage: await getPostsForUser(nextPage)});
  }
  renderContent = () => {
    const {route, myUserType} = this.props;
    const {initialRouteName = TabRoutes.Packages} = route.params;
    const user = this.getUser();
    const posts = this.getPosts();
    if (!user)
      return this.loader();

    let {name, userType, experience, rating, displayPictureUrl, packages, city, bio, slots, activeSubscriptions} = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;
    const hits = userType === userTypes.TRAINER ?
      generateTrainerHits({transformation: experience, slot: slots.length, program: packages.length, post:posts.length||0}) :
      generateUserHits({subscription: activeSubscriptions, post:posts.length||0});
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
          userType === userTypes.TRAINER && myUserType !== userTypes.TRAINER && (
            <TrainerInfo
              packages={packages}
              slots={slots}
              enrollCallback={this.enrollClicked}
              bookCallback={this.bookAppointment}
              initialRouteName={initialRouteName}
            />
          )
        }
        {
          posts &&
          <View style={styles.postListContainer}>
            <View style={styles.sectionTitleContainer}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.sectionTitle}>{strings.POSTS}</Text>
              </View>
              <PostList
                posts={posts}
                openPost={this.openPost}
                updatePosts={this.updatePosts}
                likePost={likePost}
                unlikePost={unlikePost}
                reportPost={reportPost}
              />
            </View>
          </View>
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
  sectionTitleContainer: {
    // marginTop: spacing.medium_lg,
    marginBottom: spacing.medium
  },
  sectionTitle: {
    color: 'white',
    fontSize: fontSizes.h1,
    fontFamily: fonts.MontserratMedium
  },
  postListContainer: {
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
    marginTop: spacing.medium
  },
});

const mapStateToProps = (state) => ({
  users: state.app.users,
  myUserType: state.user.userType,
  postsForUser: state.social.postsForUser
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (userId) => dispatch(actionCreators.setUser(userId)),
  getPostsForUser: userId => dispatch(actionCreators.getPostsForUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);