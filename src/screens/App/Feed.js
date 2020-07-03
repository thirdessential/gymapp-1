import React, { Component } from 'react'
import { Text, StyleSheet, View ,ScrollView} from 'react-native'
import CreatePost from '../../components/Profile/CreatePost'
import PostCardList from '../../components/Profile/PostCardList'
import CommentList from '../../components/Profile/CommentList'
import colors, {appTheme} from "../../constants/colors";
export default class Feed extends Component {
  render() {
    return (
      <ScrollView>
        <View style={{flex:1}}>
        <CreatePost/>
        <PostCardList/>
        <CommentList/>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{flex: 1, backgroundColor:appTheme.darkBackground ,justifyContent: 'center', alignItems: 'center'}
})
