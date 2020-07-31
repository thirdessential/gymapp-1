/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, LayoutAnimation, Text, TouchableOpacity} from 'react-native'
import {createImageProgress} from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';

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
import {likePost, reportPost, requestCallback, unlikePost} from "../../API";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import PostList from "../../components/Social/PostList";
import {showError, showSuccess} from "../../utils/notification";

class Profile extends Component {

  state = {
    bgImage: getRandomImage(),
    nextPage: INITIAL_PAGE,
    requestingCallback:false
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
    const {route, postsForUser} = this.props;
    const {userId} = route.params;
    if (postsForUser[userId])
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
    this.setState({requestingCallback:true});
    const {_id: userId} = this.getUser();
    const {success, message} = await requestCallback(userId);
    if (success)
      showSuccess(message);
    else showError(message);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({requestingCallback:false});

  }
  renderContent = () => {
    const user = this.getUser();
    const posts = this.getPosts();
    if (!user)
      return this.loader();

    let {name, userType, experience, rating, displayPictureUrl, packages, city, bio, slots, activeSubscriptions} = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;
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
          userType === userTypes.TRAINER && (
            <View style={styles.callbackContainer}>
              <TouchableOpacity disabled={this.state.requestingCallback} style={styles.callbackButton} onPress={this.requestCallback}>
                {this.state.requestingCallback && <ActivityIndicator color={appTheme.brightContent} size={20}/> }
                {!this.state.requestingCallback && <Text style={styles.subtitle}>{strings.REQUEST_CALLBACK}</Text>}
              </TouchableOpacity>
            </View>
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
                open={this.openPost}
                update={this.updatePosts}
                like={likePost}
                unlike={unlikePost}
                report={reportPost}
              />
            </View>
          </View>
        }
        {
          !posts || posts.length === 0 && (
            <View style={styles.noPostsContainer}>
              <Text numberOfLines={2} style={styles.sectionTitle}>{strings.NO_POSTS_BY_USER} (Replace image)</Text>
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
    alignItems:'center'
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
  postsForUser: state.social.postsForUser
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (userId) => dispatch(actionCreators.setUser(userId)),
  getPostsForUser: userId => dispatch(actionCreators.getPostsForUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);