import React, { Component } from "react";
import { StyleSheet, View, Button, Alert } from "react-native";
import { NodeCameraView } from "react-native-nodemediaclient";
import Permissions from "react-native-permissions";

import axios from "axios";
import {PERMISSIONS, request} from 'react-native-permissions';
export default class StreamScreen extends Component {
  state = {
    cameraPermission: "undetermined",
    microphonePermission: "undetermined",
    isPublishing: false,
    publishButtonText: "Start Publishing",
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    // const permission = await Permissions.checkMultiple(['camera', 'microphone']);

    // let cameraPermission = permission.camera;
    // let microphonePermission = permission.microphone;
    // console.log(cameraPermission,microphonePermission);
   
      const granted = await request(PERMISSIONS.ANDROID.CAMERA);
      console.log(granted);
      const grant1 = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
      console.log(grant1);
     
    //   cameraPermission = await Permissions.request('camera');
    
    //     microphonePermission = await Permissions.request('microphone');
      
    
    // console.log(cameraPermission,microphonePermission);

  }
  _togglePublish = () => {
    if (this.state.isPublishing) {
      this.setState({
        publishButtonText: "Start Publishing",
        isPublishing: false,
      });
      this.vb.stop();

      Alert.alert("Stream finished!", "Thanks for using the app");
    } else {
      this.setState({
        publishButtonText: "Stop Publishing",
        isPublishing: true,
      });
      this.vb.start();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <NodeCameraView
            style={styles.videoStream}
            ref={(vb) => {
              this.vb = vb;
            }}
            //outputUrl={`rtmp://a.rtmp.youtube.com/live2/332x-66dz-44rd-7ue6-4see`}
            outputUrl={`rtmp://live.restream.io/live/re_2763090_4d1e18d24532d116f676`}
            //outputUrl={`rtmp://live.restream.io/live/re_2763090_4d1e18d24532d116f676`}
            //stream key=e3b90dd3-d181-7489-2271-7d4b5c757d61
            //playback id RdCuB00aj02v7j6Xv83yTNBAwXoZVBI0202sMC00DiO6M019I
            camera={{ cameraId: 1, cameraFrontMirror: true }}
            audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
            video={{
              preset: 12,
              bitrate: 400000,
              profile: 1,
              fps: 15,
              videoFrontMirror: false,
            }}
            autopreview={true}
          />

          <View style={styles.buttonContainer}>
            <Button
              onPress={this._togglePublish}
              title={this.state.publishButtonText}
              color="#536f00"
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  videoStream: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
//Access Token ID: 81121206-1dc4-49d3-baa2-b95777832337
//Secret Key: gWhLo2YhDlJ8gcvRCmZttcTyNEyH06e1jTWnBF06pw+FBRR19LlPYeTy1F2mpe6tkZLbQ2nibQH