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
  TouchableOpacity,
} from 'react-native'

import store from '../../store/configureStore';
import {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";

import Post from "../../components/Social/Post";

const questionList = (props) => {
  const {
    questions, open, update, like, unlike, report, onProfilePress = () => {
    }
  } = props;

  const checkLiked = (likes) => {
    const {userId} = store.getState().user;
    let liked = false;
    likes.map(like => {
      if (like.likedBy === userId)
        liked = true;
    });
    return liked;
  }
  const disableSelfProfileClick = (targetUserId) => {
    const {userId} = store.getState().user;
    if (userId !== targetUserId) onProfilePress(targetUserId);
  }
  const renderPost = (post) => {
    return <TouchableOpacity
      // onPress={() => open(post._id)}
      activeOpacity={0.7}
      style={styles.postContainer}>
      <Post
        createdOn={post.createdOn}
        text={post.questionText}
        createdBy={post.postedBy.name}
        displayImageUrl={post.postedBy.displayPictureUrl}
        hideOptions
        onProfilePress={() => disableSelfProfileClick(post.postedBy.userId)}
      />
    </TouchableOpacity>
  }

  const itemSeparator = () => <View style={{marginTop: spacing.medium}}/>

  return (<>
      <View
        style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.container}
          data={questions || []}
          renderItem={({item}) => renderPost(item)}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={() => <View style={{height: spacing.medium}}/>}
          ListFooterComponent={() => <View style={{height: spacing.large}}/>}
          onEndReached={update}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={itemSeparator}
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
  }
});


export default questionList;