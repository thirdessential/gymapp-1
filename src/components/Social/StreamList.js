/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {StyleSheet, View, FlatList,RefreshControl,Text} from "react-native";

// import {spacing} from "../../constants/dimension";
import YoutubePlayer from "react-native-youtube-iframe";

import StreamCard from "./StreamCard";
import colors, {appTheme} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {spacing} from "../../constants/dimension";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');
const streamList = (props) => {
  const renderCard = ({item}) => {
    return (<View>
     {item.video_type !==null && item.video_type !== undefined && item.video_type == 'youtube' &&  <Text style={[styles.displayName, styles.postTime]}>
             {timeAgo.format(new Date(item.created_on))}
    </Text> }
      {item.video_type !==null && item.video_type !== undefined && item.video_type == 'youtube' ?<YoutubePlayer
      apiKey='AIzaSyCbtkMq1cscm51b7zPSz4ArZWgF_Bp9OkQ'
      videoId={item.video_id} // The YouTube video ID
      height={250}
      play={false}
      // videoId={"iee2TATGMyI"}
      // onChangeState={this.onStateChange}
    /> :<StreamCard
        title={item.title}
        status={item.status}
        duration={item.duration}
        date={item.date}
        host={item.host}
        onJoin={props.onJoin ? () => props.onJoin(item._id) : null}
        onStart={props.onStart ? () => props.onStart(item) : null}
    /> }
    </View>)
  }
  const renderSeparator = () => <View style={styles.separator}/>
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={props.streams}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={renderSeparator}
      ListFooterComponent={renderSeparator}
      renderItem={renderCard}
      keyExtractor={()=>Math.random()}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={false} onRefresh={()=>{props.refresh(true)}} />}
    />
  )
}


const styles = StyleSheet.create({
  container: {
  },
  separator: {
    marginTop: spacing.medium
  },
  displayName: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.default,
    fontWeight: '700',
    fontFamily: fonts.CenturyGothic,
    marginLeft: spacing.medium_sm,
    textShadowColor: 'rgba(0, 0, 0, 0.16)',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 6
  },
  postTime: {
    color: appTheme.brightContent,
    marginLeft: 'auto'
  },

});

export default React.memo(streamList);