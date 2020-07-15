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

import {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";

import Post from "../../components/Social/Post";

const postList = (props) => {
  const {posts, openPost, updatePosts} = props;

  const renderPost = (post) => {
    return <TouchableOpacity
      onPress={() => openPost(post._id)}
      activeOpacity={0.7}
      style={styles.postContainer}>
      <Post
        imageUrl={post.contentURL}
        likeCount={post.likes}
        commentCount={post.totalComments}
        createdOn={post.createdOn}
        text={post.textContent}
        likeCallback={() => {
        }}
        flagCallback={() => {
        }}
        shareCallback={() => {
        }}
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
          data={posts}
          renderItem={({item}) => renderPost(item)}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={() => <View style={{height: spacing.medium}}/>}
          ListFooterComponent={() => <View style={{height: spacing.large}}/>}
          onEndReached={updatePosts}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={itemSeparator}
        />
        {
          posts.length === 0 && (
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


export default postList;