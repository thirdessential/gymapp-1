/**
 * @author Devesh Gupta <ygupta645@gmail.com>
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";

import { appTheme } from "../../constants/colors";
import * as actionCreators from "../../store/actions";
import { spacing } from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import StreamList from "../../components/Social/StreamList";


class WorkoutVideos extends Component {

  render() {
    let { youtubeVideos } = this.props
    return (<View style={styles.container}>
      <StreamList
        streams={youtubeVideos}
        onJoin={() => { console.log('calll') }}
        refresh={(data) => { console.log(data) }}
      />
    </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    backgroundColor: appTheme.background,
    flex: 1,
  },
  switchStyle: {
    marginTop: spacing.medium,
    marginBottom: spacing.medium,
  },
  fab: {
    height: spacing.space_50,
    width: spacing.space_50,
    borderRadius: spacing.thumbnailMini / 2,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appTheme.brightContent,
  },
  fabPosition: {
    position: "absolute",
    bottom: spacing.medium_sm,
    right: spacing.medium,
  },
  noLabel: {
    fontSize: 12,
  },
  bubble: {
    backgroundColor: "transparent",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
  title: {
    color: appTheme.brightContent,
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothic,
    marginBottom: spacing.medium_sm,
  },
  nodata: {
    height: 200,
    width: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    top: '27%',
  },
  nodataText: {
    marginTop: '10%',
  }
});

const mapStateToProps = (state) => ({
  posts: state.social.posts,
  youtubeVideos: state.social.youtubeVideos,
  questions: state.social.questions,
  liveStreams: state.social.liveStreams,
  postDetails: state.social.postDetails,
  userType: state.user.userType,
  userName: state.user.userData.name
});
const mapDispatchToProps = (dispatch) => ({
  updatePosts: (page) => dispatch(actionCreators.updatePosts(page)),
  updateQuestions: (page) => dispatch(actionCreators.updateQuestions(page)),
  updateLiveStreams: (page) => dispatch(actionCreators.updateLiveStreams(page)),
  likePost: (postId) => dispatch(actionCreators.likePost(postId)),
  unlikePost: (postId) => dispatch(actionCreators.unlikePost(postId)),
  reportPost: postId => dispatch(actionCreators.reportPost(postId)),
  deletePost: postId => dispatch(actionCreators.deletePost(postId)),
  reportQuestion: id => dispatch(actionCreators.reportQuestion(id)),
  answerQuestion: (questionId, text) => dispatch(actionCreators.answerQuestion(questionId, text))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutVideos)
// export default WorkoutVideos