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
  LayoutAnimation, Text, ScrollView,
} from 'react-native'
import {connect} from "react-redux";

import {appTheme, darkPallet} from "../../constants/colors";
import * as actionCreators from '../../store/actions';
import {spacing} from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import Post from "../../components/Social/Post";
import strings from "../../constants/strings";
import store from "../../store/configureStore";
import {likePost, unlikePost} from "../../API";

class PostViewer extends Component {
  componentDidMount() {
    const {updatePost, route} = this.props;
    const {postId} = route.params;
    updatePost(postId);
  }

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
  renderPost = (post) => {
    return (
      <View style={{marginTop: spacing.medium}}>
        <Post
          imageUrl={post.contentURL}
          likeCount={post.likes.length}
          commentCount={post.totalComments}
          createdOn={post.createdOn}
          text={post.textContent}
          createdBy={post.createdBy.name}
          displayImageUrl={post.createdBy.displayPictureUrl}
          isLiked={() => this.checkLiked(post.likes)}
          likeCallback={() => likePost(post._id)}
          unlikeCallback={() => unlikePost(post._id)}
          flagCallback={() => {
          }}
          shareCallback={() => {
          }}
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
      createdBy={comment.commentedBy.name}
      displayImageUrl={comment.commentedBy.displayPictureUrl}
      showComment={false}
      unlikeCallback={() => {
      }}
      likeCallback={() => {
      }}
    />
  }
  itemSeparator = () => <View style={{marginTop: spacing.medium}}/>

  renderComments = () => {
    const post = this.getPost();
    if (!post) return null;
    return (
      <>
        <Text style={styles.sectionTitle}>{strings.COMMENTS}</Text>
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
    const {route, postDetails} = this.props;
    const {postId} = route.params;
    if (nextProps.postDetails[postId] !== this.props.postDetails[postId])
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return true;
  }


  render() {
    const post = this.getPost();
    return (<>
        <StatusBar backgroundColor={appTheme.lightBackground}/>
        <View
          style={styles.container}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {!post && <ActivityIndicator style={{position: 'absolute'}} color={appTheme.brightContent} size={50}/>}
            {post && this.renderPost(post)}
            {post && this.renderComments()}
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
  }
});

const mapStateToProps = (state) => ({
  postDetails: state.social.postDetails,
});

const mapDispatchToProps = (dispatch) => ({
  updatePost: (postId) => dispatch(actionCreators.updatePost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostViewer);