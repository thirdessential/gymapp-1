

import React, { Component } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from "react-native";
import Video from "react-native-video";




export default class ShowStreamVideo extends Component {

  

  state = {
    text: '',
    isInputContainerVisible: false,
    comments: []
  }

  constructor(props) {
    super(props);
   
    //this.stream_id = navigation.getParam('stream_id');
   // this.mux_playback_id = navigation.getParam('mux_playback_id');
    //this.stream_channel = navigation.getParam('stream_channel');
  }


  componentDidMount() {
   
  }


  render() {
    const { isInputContainerVisible } = this.state;

    return (
      <View style={styles.container}>
        <Video
          //source={{ uri: `https://stream.mux.com/fKEkjukUOEYoEE3EcitsRlnhTF3sekXqP57F2drywqk.m3u8` }}
          source={{ uri: `https://stream.mux.com/xZNT1dDRZmz8HprQMyvZqzCwUg00rkTNKTWs6JlFaDPg.m3u8` }}
          ref={ref => {
            this.player = ref;
          }}
          onError={this.onVideoError}
          onEnd={this.onVideoEnd}
          style={styles.videoStream}
          controls={true}
          resizeMode={"cover"}
        />

       
        

      </View>
    );
  }

  onVideoError = () => {
    Alert.alert('Error occurred', 'Something went wrong while loading the video');
   
  }

  onVideoEnd = () => {
    Alert.alert('Stream ended', 'The stream ended');

  }

//   _sendComment = () => {
//     const id = randomId(10);
//     const { text } = this.state;
//     this.stream_channel.trigger('client-viewer-comment', {
//       id,
//       text
//     });

//     this.setState((prevState) => ({
//       comments: prevState.comments.concat({ id, text }),
//       text: '',
//       isInputContainerVisible: false
//     }));
//   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  videoStream: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textInput: {
    height: 40,
    backgroundColor: '#FFF'
  },
  typeText: {
    color: '#FFF'
  }
});