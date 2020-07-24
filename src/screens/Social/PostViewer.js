/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  ActivityIndicator,
  LayoutAnimation, Text, ScrollView, TextInput, TouchableOpacity, Keyboard,
} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../constants/colors";
import * as actionCreators from '../../store/actions';
import {spacing} from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import Post from "../../components/Social/Post";
import strings from "../../constants/strings";
import store from "../../store/configureStore";
import {likeComment, likePost, unlikeComment, unlikePost} from "../../API";
import {MAX_POST_LENGTH} from "../../constants/appConstants";
import post from "../../components/Social/Post";
import RouteNames from "../../navigation/RouteNames";
import SingleImageViewer from "../../components/SingleImageViewer";

class PostViewer extends Component {
  state = {
    commentText: '',
    submitting: false,
    viewerOpen: false,
    viewerImageUrl: '',
  }

  componentDidMount() {
    const {updatePost, route} = this.props;
    const {postId} = route.params;
    updatePost(postId);
  }
  closeViewer = () => this.setState({viewerOpen: false, viewerImageUrl: ''})
  openViewer = (imageUrl) => this.setState({viewerImageUrl: imageUrl, viewerOpen: true})
  getPost = () => {
    const {route, postDetails} = this.props;
    if (!postDetails) return null;
    const {postId} = route.params;
    if (postDetails[postId])
      return postDetails[postId];
    else return null;
  }
  checkLiked = (likes) => {
    const {userId} = store.getState().user;
    let liked = false;
    likes.map(like => {
      if (like.likedBy === userId)
        liked = true;
    });
    return liked;
  }
  reportPost = (postId) => {
    const {navigation, reportPost} = this.props;
    navigation.goBack();
    reportPost(postId);
  }
  deletePost = (postId) => {
    const {navigation, deletePost} = this.props;
    navigation.goBack();
    deletePost(postId);
  }
  openProfile = (userId) => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.Profile, {
      userId: userId
    });
  }
  disableSelfProfileClick = (targetUserId) => {
    const {userId} = store.getState().user;
    if (userId !== targetUserId) this.openProfile(targetUserId);
  }
  renderPost = (post) => {
    const isOwnPost = post.createdBy.userId === store.getState().user.userId; // TODO: can we improve this comparison?

    return (
      <View style={{marginTop: spacing.medium}}>
        <Post
          imageUrl={post.contentURL}
          likeCount={post.likes.length}
          commentCount={post.comments.length}
          createdOn={post.createdOn}
          text={post.textContent}
          createdBy={post.createdBy.name}
          displayImageUrl={post.createdBy.displayPictureUrl}
          isLiked={() => this.checkLiked(post.likes)}
          likeCallback={() => likePost(post._id)}
          unlikeCallback={() => unlikePost(post._id)}
          flagCallback={isOwnPost?null: () => this.reportPost(post._id)}
          deleteCallback={isOwnPost?()=>this.deletePost(post._id):null}
          // shareCallback={() => {}}
          imagePressCallback={()=>this.openViewer(post.contentURL)}
          onProfilePress={()=>this.disableSelfProfileClick(post.createdBy.userId)}
        />
      </View>
    )
  }
  renderComment = (comment) => {
    if (!comment.likes) return null;
    if (!comment.approved) return null;
    return <Post
      key={comment._id}
      likeCount={comment.likes.length}
      createdOn={comment.createdOn}
      text={comment.commentText}
      isLiked={() => this.checkLiked(comment.likes)}
      createdBy={comment.commentedBy.name}
      displayImageUrl={comment.commentedBy.displayPictureUrl}
      showComment={false}
      unlikeCallback={() => unlikeComment(comment._id)}
      likeCallback={() => likeComment(comment._id)}
      onProfilePress={()=>this.openProfile(post.createdBy.userId)}
    />
  }
  itemSeparator = () => <View style={{marginTop: spacing.medium}}/>

  renderComments = () => {
    const post = this.getPost();
    if (!post) return null;
    return (
      <>
        <Text style={styles.sectionTitle}>{strings.COMMENTS}</Text>
        {this.createComment()}
        <FlatList
          data={post.comments}
          renderItem={({item}) => this.renderComment(item)}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={this.itemSeparator}
          ListHeaderComponent={this.itemSeparator}
          ListFooterComponent={this.itemSeparator}
        />
      </>
    )
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const {route} = this.props;
    const {postId} = route.params;
    if (nextProps.postDetails[postId] !== this.props.postDetails[postId])
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return true;
  }

  createComment = () => {
    return (
      <View style={styles.createCommentContainer}>
        <TextInput
          placeholder={'Write comment'}
          placeholderTextColor={appTheme.grey}
          multiline={true}
          value={this.state.commentText}
          onChangeText={this.onCommentChange}
          style={[styles.title, styles.textInput]}
          underlineColorAndroid={'transparent'}
          maxLength={MAX_POST_LENGTH}
        />
        {this.renderSubmit()}
      </View>
    )
  }
  onCommentChange = (commentText) => {
    this.setState({commentText});
  }
  submitComment = async () => {
    const {route, commentOnPost} = this.props;
    const {postId} = route.params;
    Keyboard.dismiss();
    let comment = this.state.commentText;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({submitting: true, commentText: ''});
    await commentOnPost(postId, comment);
    this.setState({submitting: false});
    this.forceUpdate();
  }
  renderSubmit = () => {
    const disabled = this.state.commentText.length < 3;
    if (this.state.submitting)
      return (
        <ActivityIndicator style={{marginTop: spacing.medium_sm}} color={appTheme.brightContent} size={30}/>
      )
    return (
      <View style={{flexDirection: 'row', marginTop: spacing.medium_sm}}>
        <TouchableOpacity
          onPress={this.submitComment}
          disabled={disabled}
          style={[styles.submitButton, {backgroundColor: disabled ? appTheme.grey : appTheme.brightContent}]}>
          <Text style={{color: 'white', fontFamily: fonts.CenturyGothic}}>{strings.COMMENT}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const post = this.getPost();
    return (<>
        <StatusBar backgroundColor={appTheme.lightBackground}/>
        <View
          style={styles.container}>
          <ScrollView keyboardShouldPersistTaps={'always'} style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {!post && <ActivityIndicator style={{position: 'absolute'}} color={appTheme.brightContent} size={50}/>}
            {post && this.renderPost(post)}
            {post && this.renderComments()}
            <SingleImageViewer
              imageUrl={this.state.viewerImageUrl}
              close={this.closeViewer}
              isOpen={this.state.viewerOpen}/>
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    backgroundColor: appTheme.background,
    flex: 1
  },
  titleContainer: {
    paddingTop: spacing.medium_sm,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.medium_sm,
    backgroundColor: appTheme.darkBackground,
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 10,
    padding: spacing.medium,
    marginBottom: spacing.medium
  },
  sectionTitle: {
    color: 'white',
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothic,
    marginTop: spacing.medium_sm,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: appTheme.background,
    width: '100%',
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    // paddingTop: spacing.large,
  },
  itemSeparatorHorizontal: {
    height: 1,
    marginTop: spacing.medium_lg,
    marginBottom: spacing.medium_lg,
    backgroundColor: appTheme.grey,
  },
  userContainer: {
    width: '100%'
  },
  postContainer: {
    borderRadius: 10
  },
  title: {
    color: 'white',
    fontFamily: fonts.CenturyGothic,
    fontWeight: '700'
  },
  textInput: {
    backgroundColor: appTheme.background,
    borderRadius: 10,
    marginTop: spacing.medium_sm,
    textAlignVertical: 'top',
    paddingLeft: spacing.small,
    paddingRight: spacing.small
  },
  createCommentContainer: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 10,
    padding: spacing.medium,
    paddingTop: spacing.small,
    marginTop: spacing.medium_sm
  },
  submitButton: {
    backgroundColor: appTheme.brightContent,
    borderRadius: 20,
    paddingLeft: spacing.medium_sm,
    paddingRight: spacing.medium_sm,
    padding: spacing.small,
    flexGrow: 0
  }
});

const mapStateToProps = (state) => ({
  postDetails: state.social.postDetails,
});

const mapDispatchToProps = (dispatch) => ({
  updatePost: (postId) => dispatch(actionCreators.updatePost(postId)),
  commentOnPost: (postId, commentText) => dispatch(actionCreators.commentOnPost(postId, commentText)),
  reportPost: postId => dispatch(actionCreators.reportPost(postId)),
  deletePost: postId => dispatch(actionCreators.deletePost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostViewer);