/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  LayoutAnimation,
} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../constants/colors";
import * as actionCreators from '../../store/actions';
import {INITIAL_PAGE} from "../../constants/appConstants";

import RouteNames, {TabRoutes} from "../../navigation/RouteNames";
import PostList from "../../components/Social/PostList";
import {spacing} from "../../constants/dimension";
import HalfRoundedButton from "../../components/HalfRoundedButton";
import strings from "../../constants/strings";

class Community extends Component {

  state = {
    nextPage: INITIAL_PAGE
  }

  updatePosts = async () => {
    const {updatePosts} = this.props;
    const {nextPage} = this.state;
    if (!!nextPage)
      this.setState({nextPage: await updatePosts(nextPage)});
  }

  componentDidMount() {
    this.updatePosts();
  }

  openPost = (postId) => {
    this.props.navigation.navigate(RouteNames.PostViewer, {postId});
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.posts.length !== this.props.posts.length)
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return true;
  }

  openProfile = (userId) => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.Profile, {
      userId: userId
    });
  }
  openPostCreator = () => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.CreatePost);
  }

  render() {
    const {posts, likePost, unlikePost, reportPost} = this.props;
    return (<View style={styles.container}>
        <StatusBar backgroundColor={appTheme.lightBackground}/>
        {/*<View style={styles.buttonContainer}>*/}
        {/*  <HalfRoundedButton title={strings.ADD_POST} onPress={this.openPostCreator}/>*/}
        {/*</View>*/}
        <PostList
          posts={posts}
          openPost={this.openPost}
          updatePosts={this.updatePosts}
          likePost={likePost}
          unlikePost={unlikePost}
          reportPost={reportPost}
          onProfilePress={this.openProfile}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    backgroundColor: appTheme.background,
    flex: 1
  },
  // buttonContainer: {
  //   justifyContent: 'flex-end',
  //   flexDirection: 'row',
  //   marginTop: spacing.medium
  // }
});

const mapStateToProps = (state) => ({
  posts: state.social.posts,
});

const mapDispatchToProps = (dispatch) => ({
  updatePosts: (page) => dispatch(actionCreators.updatePosts(page)),
  likePost: (postId) => dispatch(actionCreators.likePost(postId)),
  unlikePost: (postId) => dispatch(actionCreators.unlikePost(postId)),
  reportPost: postId => dispatch(actionCreators.reportPost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Community);