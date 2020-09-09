/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  LayoutAnimation,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  ScrollView,
} from "react-native";
import {connect} from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import {TabView, TabBar} from "react-native-tab-view";
import Entypo from "react-native-vector-icons/Entypo";

import {appTheme} from "../../constants/colors";
import * as actionCreators from "../../store/actions";
import {INITIAL_PAGE, POST_TYPE, userTypes} from "../../constants/appConstants";

import RouteNames, {TabRoutes} from "../../navigation/RouteNames";
import PostList from "../../components/Social/PostList";
import {spacing} from "../../constants/dimension";
import strings from "../../constants/strings";
import QuestionList from "../../components/Social/QuestionList";
import {likeAnswer, unlikeAnswer} from "../../API";
import ImageCard from "../../components/ImageCard";
import {iconBackgrounds} from "../../constants/images";
import {screenWidth} from "../../utils/screenDimensions";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import LiveCardList from "../../components/LiveCardList";
import StreamList from "../../components/Social/StreamList";
import {joinMeeting} from "../../utils/zoomMeeting";
import {parseComponentStack} from "react-native/Libraries/LogBox/Data/parseLogBoxLog";

const initialLayout = {width: screenWidth};

class Community extends Component {
  state = {
    nextPostPage: INITIAL_PAGE,
    nextQuestionPage: INITIAL_PAGE,
    nextLiveStreamPage: INITIAL_PAGE,
    type: POST_TYPE.TYPE_POST,
    pageIndex: 0,
  };
  updatePosts = async () => {
    const {updatePosts} = this.props;
    const {nextPostPage} = this.state;
    if (!!nextPostPage)
      this.setState({nextPostPage: await updatePosts(nextPostPage)});
  };
  updateQuestions = async () => {
    const {updateQuestions} = this.props;
    const {nextQuestionPage} = this.state;
    if (!!nextQuestionPage)
      this.setState({
        nextQuestionPage: await updateQuestions(nextQuestionPage),
      });
  };
  updateLiveStreams = async () => {
    const {updateLiveStreams} = this.props;
    const {nextLiveStreamPage} = this.state;
    if (!!nextLiveStreamPage)
      this.setState({
        nextLiveStreamPage: await updateLiveStreams(nextLiveStreamPage)
      });
  }
  openLiveScheduler = () => {
    this.closeRbSheet();
    this.props.navigation.navigate(RouteNames.LiveScheduler)
  }

  componentDidMount() {
    this.updatePosts();
    this.updateQuestions();
    this.updateLiveStreams();
  }

  openPost = (postId) => {
    this.props.navigation.navigate(RouteNames.PostViewer, {postId});
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.posts.length !== this.props.posts.length)
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return true;
  }

  openProfile = (userId) => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.Profile, {
      userId: userId,
    });
  };
  loader = () => (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <ActivityIndicator color={appTheme.brightContent} size={50}/>
    </View>
  );
  renderPosts = () => {
    const {posts, postDetails, likePost, unlikePost, reportPost, deletePost} = this.props;
    if (!posts || posts.length === 0)
      return this.loader();
    return (
      <PostList
        posts={posts.map(postId => postDetails[postId])}
        open={this.openPost}
        update={this.updatePosts}
        like={likePost}
        unlike={unlikePost}
        report={reportPost}
        onProfilePress={this.openProfile}
        deletePost={deletePost}
      />
    );
  };
  createAnswer = (questionId, answerText) => {
    const {answerQuestion} = this.props;
    answerQuestion(questionId, answerText);
  };
  renderQuestions = () => {
    const {questions, reportQuestion, postDetails} = this.props;
    if (!questions || questions.length === 0)
      return this.loader();
    return (
      <QuestionList
        questions={questions.map(questionId => postDetails[questionId])}
        onCreateAnswer={this.createAnswer}
        update={this.updateQuestions}
        onProfilePress={this.openProfile}
        onAnswerLike={likeAnswer}
        onAnswerDislike={unlikeAnswer}
        report={reportQuestion}
      />
    );
  };

  onJoinStream = (streamId) => {
    const {liveStreams, userName} = this.props;
    const targetStream = liveStreams.filter(liveStream => liveStream._id === streamId)[0];
    const {meetingNumber, meetingPassword, clientKey, clientSecret} = targetStream;
    joinMeeting(meetingNumber, meetingPassword, userName, clientKey, clientSecret);
  }
  renderLiveStreams = () => {
    return (
      <StreamList
        streams={this.props.liveStreams}
        onJoin={this.onJoinStream}
      />
    )
  }
  fab = () => {
    return (
      <TouchableOpacity
        style={[styles.fab, styles.fabPosition]}
        onPress={this.openRbSheet}
      >
        <Entypo name={"plus"} color={"white"} size={32}/>
      </TouchableOpacity>
    );
  };
  createPost = () => {
    this.closeRbSheet();
    this.props.navigation.navigate(RouteNames.CreatePost, {type: POST_TYPE.TYPE_POST});
  };
  createQuestion = () => {
    this.closeRbSheet();
    this.props.navigation.navigate(RouteNames.CreatePost, {
      type: POST_TYPE.TYPE_QUESTION,
    });
  };
  createVideo = () => {
    this.closeRbSheet();
    this.props.navigation.navigate(RouteNames.CreatePost, {
      type: POST_TYPE.TYPE_VIDEO,
    });
  };
  openRbSheet = () => this.RBSheet.open();
  closeRbSheet = () => this.RBSheet.close();
  rbSheet = () => (
    <RBSheet
      ref={(ref) => {
        this.RBSheet = ref;
      }}
      animationType={"slide"}
      closeOnDragDown={true}
      customStyles={{
        container: {
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: appTheme.lightBackground,
        },
        wrapper: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Text style={styles.title}>{strings.CREATE} </Text>
      <ScrollView
        style={{
          flexDirection: "row",
          marginBottom: spacing.medium,
          marginHorizontal: spacing.small_sm,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <ImageCard
          title={strings.POST}
          onPress={this.createPost}
          image={iconBackgrounds.workouts}
        />
        <ImageCard
          title={strings.ASK_EXPERT}
          onPress={this.createQuestion}
          image={iconBackgrounds.appointments}
        />
        <ImageCard
          title={strings.WORKOUT}
          onPress={this.createVideo}
          image={iconBackgrounds.coinMan}
        />
        {
          this.props.userType === userTypes.TRAINER && (
            <ImageCard
              title={strings.GO_LIVE}
              onPress={this.openLiveScheduler}
              image={iconBackgrounds.physical}
            />
          )
        }
      </ScrollView>
    </RBSheet>
  );
  routes = [
    {key: TabRoutes.Posts, title: strings.POSTS},
    {key: TabRoutes.Questions, title: strings.QUESTIONS},
    {key: TabRoutes.LiveStreams, title: strings.LIVE}
  ];
  renderScene = ({route}) => {
    switch (route.key) {
      case TabRoutes.Posts:
        return this.renderPosts();
      case TabRoutes.Questions:
        return this.renderQuestions();
      case TabRoutes.LiveStreams:
        return this.renderLiveStreams();
      default:
        return null;
    }
  };
  setPage = (pageIndex) => this.setState({pageIndex});

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={appTheme.lightBackground}/>

        <TabView
          navigationState={{index: this.state.pageIndex, routes: this.routes}}
          renderScene={this.renderScene}
          onIndexChange={this.setPage}
          initialLayout={initialLayout}
          swipeEnabled={false}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={{backgroundColor: "transparent"}}
              indicatorStyle={{backgroundColor: appTheme.lightContent}}
              tabStyle={styles.bubble}
              labelStyle={styles.noLabel}
            />
          )}
        />
        {this.rbSheet()}
        {this.fab()}
      </View>
    );
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
});

const mapStateToProps = (state) => ({
  posts: state.social.posts,
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

export default connect(mapStateToProps, mapDispatchToProps)(Community);
