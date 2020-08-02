import {spacing} from "../constants/dimension";
import {View, StyleSheet, ImageBackground, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {screenWidth} from "../utils/screenDimensions";
import VideoPlayer from 'react-native-video-controls';
import {getCompressedLink, getThumbnail} from "../utils/utils";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {appTheme} from "../constants/colors";

const videoPlayer = (props) => {
  const [init, setInit] = useState(false);
  const uri = getCompressedLink(props.uri, styles.content.height, styles.content.width);
  const poster = getThumbnail(props.uri, styles.content.height, styles.content.width);
  const toggleVideo =()=> setInit(!init);
  if (init)
    return (
      <VideoPlayer
        source={{uri}}
        // ref={(ref) => setVideoPlayerRef(ref)}
        repeat={false}
        // controls={true}
        // fullscreen={false}
        // paused={true}
        // showOnStart={false}
        useTextureView={false}
        resizeMode="stretch"
        disableFullscreen={true}
        // onPause={toggleVideo}
        onEnd={toggleVideo}
        disableSeekbar={true}
        disableVolume={true}
        disableBack={true}
        poster={poster}
        style={styles.content}/>
    )
  else return (
    <ImageBackground source={{uri: poster}} style={[styles.content, styles.center]} imageStyle={{borderRadius: 10}}>
      <TouchableOpacity onPress={toggleVideo}>
        <FontAwesome name={'play-circle'} size={120} color={appTheme.textPrimary}/>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  content: {
    borderRadius: 10,
    height: 250,
    width: screenWidth - spacing.medium * 4,
  },
  center:{
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default videoPlayer;