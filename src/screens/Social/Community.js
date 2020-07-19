/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  LayoutAnimation, TouchableOpacity, ActivityIndicator, Modal,
} from 'react-native'
import {connect} from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import ImageViewer from 'react-native-image-zoom-viewer';
import Entypo from "react-native-vector-icons/Entypo";

import {appTheme} from "../../constants/colors";
import * as actionCreators from '../../store/actions';
import {INITIAL_PAGE, POST_TYPE} from "../../constants/appConstants";

import RouteNames from "../../navigation/RouteNames";
import PostList from "../../components/Social/PostList";
import {spacing} from "../../constants/dimension";
import SwitchSelector from "react-native-switch-selector";
import strings from "../../constants/strings";
import QuestionList from "../../components/Social/QuestionList";
import {likeAnswer, unlikeAnswer} from "../../API";
import ImageCard from "../../components/ImageCard";
import {iconBackgrounds} from "../../constants/images";
import SingleImageViewer from "../../components/SingleImageViewer";

class Community extends Component {

  state = {
    nextPostPage: INITIAL_PAGE,
    nextQuestionPage: INITIAL_PAGE,
    type: POST_TYPE.TYPE_POST,
    viewerOpen: false,
    viewerImageUrl: ''
  }

  updatePosts = async () => {
    const {updatePosts} = this.props;
    const {nextPostPage} = this.state;
    if (!!nextPostPage)
      this.setState({nextPostPage: await updatePosts(nextPostPage)});
  }
  updateQuestions = async () => {
    const {updateQuestions} = this.props;
    const {nextQuestionPage} = this.state;
    if (!!nextQuestionPage)
      this.setState({nextQuestionPage: await updateQuestions(nextQuestionPage)});
  }

  componentDidMount() {
    this.updatePosts();
    this.updateQuestions();
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
  changeSwitch = (type) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({type});
  }
  renderSelector = () => {
    return (
      <View style={styles.switchStyle}>
        <SwitchSelector
          initial={0}
          onPress={this.changeSwitch}
          textColor={'white'}
          selectedColor={'white'}
          buttonColor={appTheme.brightContent}
          borderColor={appTheme.darkBackground}
          backgroundColor={appTheme.darkBackground}
          hasPadding
          options={[
            {label: strings.POSTS, value: POST_TYPE.TYPE_POST},
            {label: strings.QUESTIONS, value: POST_TYPE.TYPE_QUESTION}
          ]}
        />
      </View>
    )
  }
  renderPosts = () => {
    const {posts, likePost, unlikePost, reportPost} = this.props;
    return (
      <PostList
        posts={posts}
        open={this.openPost}
        update={this.updatePosts}
        like={likePost}
        unlike={unlikePost}
        report={reportPost}
        viewImage={this.openViewer}
        onProfilePress={this.openProfile}
      />
    )
  }
  createAnswer = (questionId, answerText) => {
    const {answerQuestion} = this.props;
    answerQuestion(questionId, answerText);
  }
  renderQuestions = () => {
    const {questions} = this.props;
    return (
      <QuestionList
        questions={questions}
        onCreateAnswer={this.createAnswer}
        update={this.updateQuestions}
        onProfilePress={this.openProfile}
        onAnswerLike={likeAnswer}
        onAnswerDislike={unlikeAnswer}
      />
    )
  }
  fab = () => {
    return (
      <TouchableOpacity style={[styles.fab, styles.fabPosition]} onPress={this.openRbSheet}>
        <Entypo
          name={'plus'}
          color={'white'}
          size={32}
        />
      </TouchableOpacity>
    );
  };
  createPost = () => {
    this.closeRbSheet();
    this.props.navigation.navigate(RouteNames.CreatePost)
  }
  createQuestion = () => {
    this.closeRbSheet();
    this.props.navigation.navigate(RouteNames.CreatePost, {type: POST_TYPE.TYPE_QUESTION})
  }
  openRbSheet = () => this.RBSheet.open()
  closeRbSheet = () => this.RBSheet.close()
  closeViewer = () => this.setState({viewerOpen: false, viewerImageUrl: ''})
  openViewer = (imageUrl) => this.setState({viewerImageUrl: imageUrl, viewerOpen: true})
  rbSheet = () => (<RBSheet
      ref={ref => {
        this.RBSheet = ref;
      }}
      animationType={'slide'}
      closeOnDragDown={true}
      customStyles={{
        container: {
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: appTheme.lightBackground,
        },
        wrapper: {
          backgroundColor: 'transparent'
        }
      }}
    >
      <View style={{flexDirection: 'row'}}>
        <ImageCard title={strings.POST} onPress={this.createPost} image={iconBackgrounds.workouts}/>
        <ImageCard title={strings.ASK_EXPERT} onPress={this.createQuestion} image={iconBackgrounds.appointments}/>
      </View>
    </RBSheet>
  )

  render() {
    const {type} = this.state;
    return (<View style={styles.container}>
        <StatusBar backgroundColor={appTheme.lightBackground}/>
        {this.renderSelector()}
        {type === POST_TYPE.TYPE_POST && this.renderPosts()}
        {type === POST_TYPE.TYPE_QUESTION && this.renderQuestions()}
        {this.rbSheet()}
        <SingleImageViewer
          imageUrl={this.state.viewerImageUrl}
          close={this.closeViewer}
          isOpen={this.state.viewerOpen}/>
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
    flex: 1
  },
  switchStyle: {
    marginTop: spacing.medium,
    marginBottom: spacing.medium
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


});

const mapStateToProps = (state) => ({
  posts: state.social.posts,
  questions: state.social.questions
});

const mapDispatchToProps = (dispatch) => ({
  updatePosts: (page) => dispatch(actionCreators.updatePosts(page)),
  updateQuestions: (page) => dispatch(actionCreators.updateQuestions(page)),
  likePost: (postId) => dispatch(actionCreators.likePost(postId)),
  unlikePost: (postId) => dispatch(actionCreators.unlikePost(postId)),
  reportPost: postId => dispatch(actionCreators.reportPost(postId)),
  answerQuestion: (questionId, text) => dispatch(actionCreators.answerQuestion(questionId, text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Community);