/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native'

import store from '../../store/configureStore';
import {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";

import Post from "../../components/Social/Post";
import AnswerList from "./AnswerList";
import AnswerInput from "./AnswerInput";
import {likeAnswer, unlikeAnswer} from "../../API";

const questionList = (props) => {
  const {
    questions, update, onCreateAnswer,onAnswerLike,onAnswerDislike,report, onProfilePress = () => {
    }
  } = props;

  const disableSelfProfileClick = (targetUserId) => {
    const {userId} = store.getState().user;
    if (userId !== targetUserId) onProfilePress(targetUserId);
  }
  const renderAnswerBox = (questionId) => <AnswerInput
    onSubmit={(answerText) => onCreateAnswer(questionId, answerText)}/>

  const renderQuestion = (question) => {
    const isOwn = question.postedBy.userId === store.getState().user.userId; // TODO: can we improve this comparison?
    console.log(isOwn)
    return <>
      <Post
        createdOn={question.createdOn}
        text={question.questionText}
        createdBy={question.postedBy.name}
        displayImageUrl={question.postedBy.displayPictureUrl}
        hideOptions
        onProfilePress={() => disableSelfProfileClick(question.postedBy.userId)}
        renderFooter={() => renderAnswerBox(question._id)}
        flagCallback={isOwn?null: () => report(question._id)}
      />
      {renderAnswers(question.answers)}
    </>
  }
  const renderAnswers = (answers) => {
    return (
      <AnswerList
        answers={answers}
        onProfilePress={onProfilePress}
        onAnswerLike={onAnswerLike}
        onAnswerDislike={onAnswerDislike}
      />
    )
  }
  const itemSeparator = () => <View style={{marginTop: spacing.medium}}/>
  return (<>
      <View
        style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.container}
          data={questions || []}
          renderItem={({item}) => renderQuestion(item)}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={() => <View style={{height: spacing.medium}}/>}
          ListFooterComponent={() => <View style={{height: spacing.large}}/>}
          onEndReached={update}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={itemSeparator}
          keyboardShouldPersistTaps={'always'}
        />
        {
          !questions && (
            <ActivityIndicator style={{position: 'absolute'}} color={appTheme.brightContent} size={50}/>
          )
        }
      </View>
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: spacing.medium,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    width: '100%',
  },
});


export default React.memo(questionList);