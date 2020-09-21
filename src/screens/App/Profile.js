/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, LayoutAnimation, Text, TouchableOpacity} from 'react-native'
import {createImageProgress} from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import PreventScreenshotAndroid from 'react-native-prevent-screenshot-android';
const Image = createImageProgress(FastImage);
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {connect} from "react-redux";

import ProfileOverview from '../../components/Profile/ProfileOverview';
import RouteNames from "../../navigation/RouteNames";
import * as actionCreators from '../../store/actions';
import {requestCameraAndAudioPermission} from "../../utils/permission";
import {generateTrainerHits, generateUserHits, initialiseVideoCall} from "../../utils/utils";
import {appTheme} from "../../constants/colors";
import {screenHeight, screenWidth} from '../../utils/screenDimensions';
import strings from "../../constants/strings";
import {defaultDP, INITIAL_PAGE, userTypes} from "../../constants/appConstants";
import {getRandomImage} from "../../constants/images";
import {spacing} from "../../constants/dimension";
import {requestCallback} from "../../API";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import PostList from "../../components/Social/PostList";
import {showError, showSuccess} from "../../utils/notification";
import CertificateList from "../../components/Trainer/CertificateList";
import PackagePreviewList from "../../components/Trainer/PackagePreviewList";

class Profile extends Component {

  state = {
    bgImage: getRandomImage(),
    nextPage: INITIAL_PAGE, // pagination state for posts
    requestingCallback: false, // loading indicator for call back request
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
    // Restrict screenshots on all profiles
    PreventScreenshotAndroid.forbidScreenshot();
  }

  componentWillUnmount() {
    // Allow screenshot when exiting screen
    PreventScreenshotAndroid.allowScreenshot();
  }

  callClicked = async () => {
    const {route} = this.props;
    const {userId} = route.params;
    const permissionGranted = await requestCameraAndAudioPermission();

    if (permissionGranted) {
      await initialiseVideoCall(userId);
    } else console.log("Cant initiate video call without permission");
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
    const {route, postsForUser, postDetails} = this.props;
    const {userId} = route.params;
    if (postsForUser[userId]) // since postsForUser only contain id arras, we populate them with postDetails
      return postsForUser[userId].map(postId => postDetails[postId]);
    return [];
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const {route, users} = nextProps;
    const {userId} = route.params;
    const nextUser = users[userId];
    const currentUser = this.getUser();
    // If user is fetched from api, we should update his wall image specifically after api call, all other fields are
    // automatically updated
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
  openPackage = () => {
    const {navigation} = this.props;
    const {userType, _id} = this.getUser();
    if (userType === userTypes.TRAINER)
      navigation.navigate(RouteNames.PackagesView, {
        userId: _id
      });
  }
  requestCallback = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({requestingCallback: true});
    const {_id: userId} = this.getUser();
    const {success, message} = await requestCallback(userId);
    if (success)
      showSuccess(message);
    else showError(message);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({requestingCallback: false});

  }
  onPackagePress = (userId, packageId) => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.PackagesView, {
      userId,
      packageId
    });
  }
  renderContent = () => {
    const user = this.getUser();
    const posts = this.getPosts();
    if (!user)
      return this.loader();

    let {name, userType, experience, rating, displayPictureUrl, packages, city, bio, slots, activeSubscriptions, certificates} = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;
    // Hits are the user's post count, slots count etc
    const hits = userType === userTypes.TRAINER ?
      generateTrainerHits({
        transformation: experience,
        slot: slots.length,
        program: packages.length,
        post: posts.length || 0
      }) :
      generateUserHits({subscription: activeSubscriptions, post: posts.length || 0});
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
          onHitsPress={this.openPackage}
        />

        {
          // Request callback button for trainers
          userType === userTypes.TRAINER  && (
            <View style={styles.callbackContainer}>
              <TouchableOpacity disabled={this.state.requestingCallback} style={styles.callbackButton}
                                onPress={this.requestCallback}>
                {this.state.requestingCallback && <ActivityIndicator color={appTheme.brightContent} size={20}/>}
                {!this.state.requestingCallback && <Text style={styles.subtitle}>{strings.REQUEST_CALLBACK}</Text>}
              </TouchableOpacity>
            </View>
          )
        }
        {
          // Trainer packages display
          userType === userTypes.TRAINER && packages.length > 0 && (
            <View style={styles.postListContainer}>
              <Text style={[styles.sectionTitle, {marginBottom: spacing.medium_sm}]}>{strings.PACKAGES}</Text>
              <PackagePreviewList onPackagePress={packageId => this.openPackage(user._id, packageId)}
                                  packages={packages}/>
            </View>
          )
        }
        {
          // Trainer certificates
          userType === userTypes.TRAINER && certificates && certificates.length > 0 && (
            <View style={styles.postListContainer}>
              <Text style={styles.sectionTitle}>{strings.CERTIFICATIONS}</Text>
              <CertificateList data={certificates}/>
            </View>
          )
        }
        {
          // User posts
          posts &&
          <View style={styles.postListContainer}>
            <View style={styles.sectionTitleContainer}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.sectionTitle}>{strings.POSTS}</Text>
              </View>
              <PostList
                posts={posts}
                open={this.openPost}
                update={this.updatePosts}
                like={this.props.likePost}
                unlike={this.props.unlikePost}
                report={this.props.reportPost}
              />
            </View>
          </View>
        }
        {
          (!posts || posts.length === 0) && (
            <View style={styles.noPostsContainer}>
              <Text numberOfLines={2} style={styles.sectionTitle}>{strings.NO_POSTS_BY_USER}</Text>
            </View>
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
  subtitle: {
    color: appTheme.brightContent,
    fontSize: 14,
    fontFamily: fonts.CenturyGothicBold,
  },
  sectionTitleContainer: {
    marginBottom: spacing.medium
  },
  sectionTitle: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothicBold,

  },
  postListContainer: {
    marginHorizontal: spacing.medium,
    marginTop: spacing.medium
  },
  callbackContainer: {
    backgroundColor: appTheme.background,
    paddingHorizontal: spacing.large,
    paddingBottom: spacing.medium_sm,
    alignItems: 'flex-start'
  },
  noPostsContainer: {
    height: screenHeight / 4,
    alignItems: 'center'
  },
  callbackButton: {
    padding: spacing.small,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appTheme.brightContent,
    paddingHorizontal: spacing.small_lg
  }
});

const mapStateToProps = (state) => ({
  users: state.app.users,
  myUserType: state.user.userType,
  postsForUser: state.social.postsForUser,
  postDetails: state.social.postDetails
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (userId) => dispatch(actionCreators.setUser(userId)),
  getPostsForUser: userId => dispatch(actionCreators.getPostsForUser(userId)),
  likePost: (postId) => dispatch(actionCreators.likePost(postId)),
  unlikePost: (postId) => dispatch(actionCreators.unlikePost(postId)),
  reportPost: postId => dispatch(actionCreators.reportPost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);