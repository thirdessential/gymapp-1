import {spacing} from "../constants/dimension";
import {View, StyleSheet} from "react-native";
import React from "react";
import {screenWidth} from "../utils/screenDimensions";
import VideoPlayer from 'react-native-video-controls';
import Video from "react-native-video";

const videoPlayer = (props) => {
  return null;
  return (
    <>
      <VideoPlayer
        source={{uri: props.uri}}
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
        poster={'https://c7.uihere.com/files/202/347/589/athletes-endurance-energy-exercise-thumb.jpg'} //tmp
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