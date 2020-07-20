/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native'

import store from '../../store/configureStore';
import {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";

import Answer from "./Answer";

const answerList = (props) => {
  const {
    answers, onAnswerDislike, onAnswerLike, onProfilePress = () => {
    }
  } = props;
  const disableSelfProfileClick = (targetUserId) => {
    const {userId} = store.getState().user;
    if (userId !== targetUserId) onProfilePress(targetUserId);
  }
  const itemSeparator = () => <View style={styles.itemSeparator}/>;
  const checkLiked = (likes) => {
    const {userId} = store.getState().user;
    let liked = false;
    likes.map(like => {
      if (like.likedBy === userId)
        liked = true;
    });
    return liked;
  }
  const renderAnswer = (answer) => {
    return (
      <Answer
        createdOn={answer.createdOn}
        text={answer.answerText}
        createdBy={answer.postedBy.name}
        onProfilePress={() => disableSelfProfileClick(answer.postedBy.userId)}
        likeCount={answer.likes.length}
        likeCallback={()=>onAnswerLike(answer._id)}
        unlikeCallback={()=>onAnswerDislike(answer._id)}
        isLiked={()=>checkLiked(answer.likes)}
      />
    )
  }

  if (!answers || answers.length === 0) return null;
  return (<>
      <View
        style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.container}
          data={answers || []}
          renderItem={({item}) => renderAnswer(item)}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={() => <View style={{height: spacing.medium}}/>}
          ListFooterComponent={() => <View style={{height: spacing.large}}/>}
          ItemSeparatorComponent={itemSeparator}
        />
      </View>
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // paddingBottom: spacing.medium,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    width: '100%',
    backgroundColor: appTheme.background,
    borderRadius: 10,
    borderColor: appTheme.darkBackground,
    borderWidth: 1,
    elevation: 5,
    top: -spacing.medium_sm
  },
  itemSeparator: {
    height: 0.5,
    backgroundColor: appTheme.brightContent,
    marginLeft: spacing.medium,
    marginRight: spacing.medium
  }
});


export default React.memo(answerList);