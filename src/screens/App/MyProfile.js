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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Button, Overlay, Card } from 'react-native-elements';
import CropImagePicker from 'react-native-image-crop-picker';
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
import {uploadImage} from "../../API";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import PostList from "../../components/Social/PostList";
import HalfRoundedButton from "../../components/HalfRoundedButton";
import CertificateList from "../../components/Trainer/CertificateList";

class MyProfile extends PureComponent {

  state = {
    bgImage: getRandomImage(), // cover image source
    nextPage: INITIAL_PAGE, // pagination state for my posts
    refreashing:false,
    isModalVisible : false
  }

  updatePosts = async () => {
    const {updatePosts} = this.props;
    const {nextPage} = this.state;
    if (!!nextPage) // supply local pagination to updatePosts, this function will execute until pages run out
      this.setState({nextPage: await updatePosts(nextPage)});
  }

  openPost = (postId) => {
    this.props.navigation.navigate(RouteNames.PostViewer, {postId});
  }

  componentDidMount() {
    const {syncSubscriptions, updateUserData, userData} = this.props;
    this.updatePosts();
    let {wallImageUrl} = userData;
    if (!!wallImageUrl) {
      this.setState({bgImage: {uri: wallImageUrl}});
    }
    syncSubscriptions();
    updateUserData();
  }

  editProfile = () => {
    this.props.navigation.navigate(RouteNames.ProfileEdit);
  }
   handleUpload = () => {  
    CropImagePicker.openPicker({
      width: screenWidth,
      height: screenHeight * 2/3,
      cropping: true
    }).then(async (response) => {
      this.toggleModal()
      this.setState({
        bgImage: {uri: response.path},
      });
      await uploadImage(response.path, this.props.authToken, imageTypes.COVER);
      this.props.updateUserData();
    });
    
  };
  handleCapture = () => {
    CropImagePicker.openCamera({
      width: screenWidth,
      height: screenHeight * 2/3,
      cropping: true,
    }).then(async (response) => {
      this.toggleModal()
      this.setState({
        bgImage: {uri: response.path},
      });
      await uploadImage(response.path, this.props.authToken, imageTypes.COVER);
      this.props.updateUserData();
    });
  };

  editCover = () => {
    pickImage(async response => {
      if (!response.uri) return;
      console.log('image url', response.uri);
      this.setState({
        bgImage: {uri: response.uri},
      });

      await uploadImage(response.path, this.props.authToken, imageTypes.COVER);
      this.props.updateUserData();
    });
  }

  renderCoverEdit = () => (
    <TouchableOpacity
      hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}
      onPress={this.toggleModal} style={styles.coverEditButton}>
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
  setrefreash =() =>{
  this.setState({
    refreashing:false
  })
  }
  renderContent = () => {
    const {posts, postDetails, likePost, unlikePost, deletePost} = this.props;
    const user = this.props.userData;

    let {name, userType, experience, rating, displayPictureUrl, city, bio, packages, slots, activeSubscriptions, certificates} = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;
    // Hits are the user's post count, slots count etc
    const hits = userType === userTypes.TRAINER ?
      generateTrainerHits({
        transformation: experience,
        slot: slots.length,
        program: packages.length,
        post: posts && posts.length
      }) :
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
          // Render trainer certificates if found any
          userType === userTypes.TRAINER && certificates.length > 0 && (
            <View style={styles.postListContainer}>
              <Text style={styles.sectionTitle}>{strings.CERTIFICATIONS}</Text>
              <CertificateList data={certificates}/>
            </View>
          )
        }
        {
          // Render my posts
          posts &&
          <View style={styles.postListContainer}>
            <View style={styles.sectionTitleContainer}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.sectionTitle}>{strings.POSTS}</Text>
                <HalfRoundedButton onPress={this.createPost} title={strings.ADD_POST}/>
              </View>
              <PostList
                posts={posts.map(postId => postDetails[postId])}
                open={this.openPost}
                update={this.updatePosts}
                like={likePost}
                unlike={unlikePost}
                deletePost={deletePost}
                refreashing={this.state.refreashing}
                refreash={(data)=>{this.setrefreash(data)}}
              />
            </View>
          </View>
        }
        {
          (!posts || posts.length===0) && (
            <View style={styles.noPostsContainer}>
              <Text numberOfLines={2} style={styles.sectionTitle}>{strings.NO_POSTS_BY_USER}</Text>
            </View>
          )
        }
      </>
    )
  }
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    return (
      <>
      <ParallaxScrollView
        backgroundColor={appTheme.lightBackground}
        contentBackgroundColor={appTheme.background}
        parallaxHeaderHeight={screenHeight * 2 / 3}
        renderForeground={() => (
          <>
            <this.renderCoverEdit/>
            <Image
              style={{width: screenWidth, height: screenHeight * 2/3}}
              source={this.state.bgImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          </>
        )}>
        <this.renderContent/>
      </ParallaxScrollView>
      <Overlay 
        overlayStyle = {{position : "absolute", bottom : "0%" , borderTopRightRadius : 15, borderTopLeftRadius : 15 , backgroundColor : appTheme.darkBackground}} 
        isVisible={this.state.isModalVisible} 
        onBackdropPress={this.toggleModal}>
          <View style = {{width : 350}}>
            <Text 
              style = {{fontSize : 15, textAlign : "center", padding : 10, color: appTheme.brightContent}}>
              Select Image
            </Text>
            <TouchableOpacity onPress={this.handleCapture}>
              <Card.Divider style = {{backgroundColor : appTheme.grey}} />
              <Card.Title style = {{color: appTheme.brightContent}}>Take Photo</Card.Title>
              <Card.Divider style = {{backgroundColor : appTheme.grey}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleUpload} >
              <Card.Title style = {{color: appTheme.brightContent}}>Choose from Library</Card.Title>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleModal} >
              <Card.Divider style = {{backgroundColor : appTheme.grey}} />
              <Card.Title style = {{color: appTheme.brightContent}}>Cancel</Card.Title>
            </TouchableOpacity>
          </View>                   
        </Overlay>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.background,
  },
  contentContainer: {},
  titleStyle: {
    color: appTheme.textPrimary,
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
    color: appTheme.textPrimary,
    marginLeft: spacing.medium_sm
  },
  sectionTitleContainer: {
  },
  sectionTitle: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothic
  },
  postListContainer: {
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
    marginTop: spacing.medium
  },
  noPostsContainer: {
    height: screenHeight / 2,
    alignItems: 'center',
    justifyContent:'center'
  },
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  subscriptions: state.trainer.subscriptions,
  authToken: state.user.authToken,
  posts: state.social.myPosts,
  postDetails: state.social.postDetails
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