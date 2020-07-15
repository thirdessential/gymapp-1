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

import RouteNames from "../../navigation/RouteNames";
import PostList from "../../components/Social/PostList";
import {spacing} from "../../constants/dimension";

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

  render() {
    const {posts} = this.props;
    return (<View style={styles.container}>
        <StatusBar backgroundColor={appTheme.lightBackground}/>
        <PostList
          posts={posts}
          openPost={this.openPost}
          updatePosts={this.updatePosts}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    backgroundColor:appTheme.background,
    flex:1
  }
});

const mapStateToProps = (state) => ({
  posts: state.social.posts,
});

const mapDispatchToProps = (dispatch) => ({
  updatePosts: (page) => dispatch(actionCreators.updatePosts(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Community);