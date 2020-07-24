/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
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
import {defaultDP, imageTypes, INITIAL_PAGE, userTypes} from "../../constants/appConstants";
import {getRandomImage} from "../../constants/images";
import RouteNames from "../../navigation/RouteNames";
import {generateTrainerHits, generateUserHits, pickImage} from "../../utils/utils";
import {spacing} from "../../constants/dimension";
import * as actionCreators from "../../store/actions";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {uploadImage} from "../../API";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import PostList from "../../components/Social/PostList";
import HalfRoundedButton from "../../components/HalfRoundedButton";

class MyProfile extends PureComponent {

  state = {
    bgImage: getRandomImage(),
    nextPage: INITIAL_PAGE
  }

  updatePosts = async () => {
    const {updatePosts} = this.props;
    const {nextPage} = this.state;
    if (!!nextPage)
      this.setState({nextPage: await updatePosts(nextPage)});
  }

  openPost = (postId) => {
    this.props.navigation.navigate(RouteNames.PostViewer, {postId});
  }

  componentDidMount() {
    const {syncSubscriptions, updateUserData, userData, navigation} = this.props;
    this.updatePosts();
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


  createPost = () => {
    this.props.navigation.navigate(RouteNames.CreatePost);
  }
  renderContent = () => {
    const {posts, likePost, unlikePost, deletePost} = this.props;
    const user = this.props.userData;

    let {name, userType, experience, rating, displayPictureUrl, city, bio, packages, slots, activeSubscriptions} = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;
    const hits = userType === userTypes.TRAINER ?
      generateTrainerHits({transformation: experience, slot: slots.length, program: packages.length}) :
      generateUserHits({subscription: activeSubscriptions, post: posts && posts.length});
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
          posts &&
          <View style={styles.postListContainer}>
            <View style={styles.sectionTitleContainer}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.sectionTitle}>{strings.POSTS}</Text>
                <HalfRoundedButton onPress={this.createPost} title={strings.ADD_POST}/>
              </View>
              <PostList
                posts={posts}
                open={this.openPost}
                update={this.updatePosts}
                like={likePost}
                unlike={unlikePost}
                deletePost={deletePost}
              />
            </View>
          </View>
        }
      </>
    )
  }

  render() {
    return (
      <ParallaxScrollView
        backgroundColor={appTheme.lightBackground}
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
  contentContainer: {},
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
  },
  sectionTitleContainer: {
    // marginTop: spacing.medium_lg,
    // marginBottom: spacing.medium
  },
  sectionTitle: {
    color: 'white',
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothic
  },
  postListContainer: {
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
    marginTop: spacing.medium
  }
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  subscriptions: state.trainer.subscriptions,
  authToken: state.user.authToken,
  posts: state.social.myPosts,
});

const mapDispatchToProps = (dispatch) => ({
  syncSubscriptions: () => dispatch(actionCreators.syncSubscriptions()),
  updateUserData: () => dispatch(actionCreators.updateUserData()),
  updatePosts: (page) => dispatch(actionCreators.updatePosts(page, true)),
  likePost: (postId) => dispatch(actionCreators.likePost(postId)),
  unlikePost: (postId) => dispatch(actionCreators.unlikePost(postId)),
  deletePost: postId => dispatch(actionCreators.deletePost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);