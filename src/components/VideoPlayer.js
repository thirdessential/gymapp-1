import {spacing} from "../constants/dimension";
import {View, StyleSheet} from "react-native";
import React from "react";
import {screenWidth} from "../utils/screenDimensions";
import VideoPlayer from 'react-native-video-controls';
import {getCompressedLink, getThumbnail} from "../utils/utils";

const videoPlayer = (props) => {
  return (
    <>
      <VideoPlayer
        source={{uri: getCompressedLink(props.uri, styles.content.height, styles.content.width)}}
        // ref={(ref) => setVideoPlayerRef(ref)}
        repeat={false}
        // controls={true}
        // fullscreen={false}
        paused={true}
        // showOnStart={false}
        useTextureView={false}
        resizeMode="stretch"
        disableFullscreen={true}
        disableSeekbar={true}
        disableVolume={true}
        disableBack={true}
        poster={getThumbnail(props.uri, styles.content.height, styles.content.width)}
        style={styles.content}/>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    borderRadius: 10,
    height: 250,
    width: screenWidth - spacing.medium * 4
  },
})

export default videoPlayer;