import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Swiper from 'react-native-swiper';
import YoutubePlayer from "react-native-youtube-iframe";
import colors, { appTheme, bmiColors } from "../../constants/colors";
import RouteNames from "../../navigation/RouteNames";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import { spacing } from "../../constants/dimension";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

import StreamCard from "./StreamCard";
import strings from "../../constants/strings";

class StreamSwiper extends PureComponent {

  renderStream = (stream) => {
    const onJoin = stream.isMyStream ? null : () => this.props.onJoin(stream._id);
    const onStart = stream.isMyStream ? () => this.props.onStart(stream) : null;
    return <View key={stream._id}>
      {stream.video_type !== null && stream.video_type !== undefined && stream.video_type == 'youtube' && <Text style={[styles.displayName, styles.postTime]}>
        {timeAgo.format(new Date(stream.created_on))}
      </Text>}

      {stream.video_type !== null && stream.video_type !== undefined && stream.video_type == 'youtube' ?

        <YoutubePlayer
          apiKey='AIzaSyCbtkMq1cscm51b7zPSz4ArZWgF_Bp9OkQ'
          videoId={stream.video_id} // The YouTube video ID
          height={250}
          play={false}
         /> : stream.view_more ?  <View style={[styles.card, styles.noContentContainer]}>
         <TouchableOpacity onPress={() => { this.props.navigation.navigate(RouteNames.WorkoutVideos) }}>
           <Text style={styles.noContent}>{strings.SEE_MORE}</Text>
         </TouchableOpacity>
       </View> : 
         <StreamCard
          title={stream.title}
          status={stream.status}
          duration={stream.duration}
          date={stream.date}
          host={stream.host}
          onJoin={onJoin}
          onStart={onStart}
        />}
    </View>
  };

  render() {
    return (
      <View style={styles.card}>
        <Swiper
          loop={false}
          loadMinimal={true}
        >
          {this.props.streams.map(stream => this.renderStream(stream))}
          {/* <View style={[styles.card, styles.noContentContainer]}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate(RouteNames.WorkoutVideos) }}>
              <Text style={styles.noContent}>{strings.SEE_MORE}</Text>
            </TouchableOpacity>
          </View> */}
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 233
  },
  displayName: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.default,
    fontWeight: '700',
    fontFamily: fonts.CenturyGothic,
    marginLeft: spacing.medium_sm,
    textShadowColor: 'rgba(0, 0, 0, 0.16)',
    textShadowOffset: { width: 3, height: 0 },
    textShadowRadius: 6
  },
  postTime: {
    color: appTheme.brightContent,
    marginLeft: 'auto'
  },
  noContentContainer: {
    minHeight: 100,
    justifyContent: 'center',
  },
  noContent: {
    color: bmiColors.lightBlue,
    fontFamily: fonts.CenturyGothicBold,
    fontSize: fontSizes.h2,
    textAlign: 'center'
  }
});


export default StreamSwiper;