import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';
import RNExitApp from "react-native-exit-app";

const PushNotification = require("react-native-push-notification");
import requestCameraAndAudioPermission from "../../utils/permission";
import RouteNames from "../../navigation/RouteNames";

const {width} = Dimensions.get('window');
import CallBackground from '../../../assets/callBg.jpg';
import DefaultUser from '../../../assets/defaultUser.png';

import {connect} from "react-redux";
import * as actionCreators from "../../store/actions";

class CallScreen extends Component {
  clickEventListener = () => {

  }

  rejectCall = async() => {
    PushNotification.cancelAllLocalNotifications();
    await this.props.endCall();
    RNExitApp.exitApp();
  }

  acceptCall = async () => {
    const {callData, setCallActive, navigation} = this.props;
    const {agoraAppId, sessionId} = callData;

    PushNotification.cancelAllLocalNotifications();

    const permissionGranted = await requestCameraAndAudioPermission();
    if (!permissionGranted) return;
    setCallActive();
    navigation.replace(RouteNames.VideoCall, {
      AppID: agoraAppId,
      ChannelName: sessionId
    });
  }

  render() {
    const {callData} = this.props;
    const {dpUrl, displayName} = callData;
    let imgSource = !dpUrl ? {uri: dpUrl} : DefaultUser;
    return (
      <ImageBackground source={CallBackground} style={{flex: 1}}>
        <View style={styles.topBar}>

          <Text style={styles.title}>{displayName}</Text>
          <Text style={styles.subText}>CALLING</Text>
        </View>
        <TouchableOpacity style={[styles.btnStopCall, styles.shadow]} onPress={this.rejectCall}>
          <Image style={styles.iconImg} source={{uri: "https://img.icons8.com/windows/32/000000/phone.png"}}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnStartCall, styles.shadow]} onPress={this.acceptCall}>
          <Image style={styles.iconImg} source={{uri: "https://img.icons8.com/windows/32/000000/phone.png"}}/>
        </TouchableOpacity>
        <Image style={[styles.image]} source={imgSource}/>
        <View style={styles.bottomBar}>
          <TouchableOpacity style={[styles.btnAction, styles.shadow]} onPress={() => this.clickEventListener()}>
            <Image style={styles.iconImg}
                   source={{uri: "https://img.icons8.com/material-rounded/48/000000/speaker.png"}}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, styles.shadow]} onPress={() => this.clickEventListener()}>
            <Image style={styles.iconImg}
                   source={{uri: "https://img.icons8.com/material-outlined/48/000000/topic.png"}}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAction, styles.shadow]} onPress={() => this.clickEventListener()}>
            <Image style={styles.iconImg}
                   source={{uri: "https://img.icons8.com/material-outlined/48/000000/block-microphone.png"}}/>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

}

const styles = StyleSheet.create({
  topBar: {
    height: 140,
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e20e30',
    marginTop: 250
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: '#f0efef',
    fontSize: 36,
  },
  subText: {
    color: '#c8c8c8',
    fontSize: 14,
  },
  iconImg: {
    height: 32,
    width: 32,
    alignSelf: 'center'
  },
  btnStopCall: {
    height: 65,
    width: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    backgroundColor: "#FF0000",
    position: 'absolute',
    bottom: 160,
    left: '20%',
    zIndex: 1,
  },
  btnStartCall: {
    height: 65,
    width: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    backgroundColor: "green",
    position: 'absolute',
    bottom: 160,
    right: '20%',
    zIndex: 1,
  },
  btnAction: {
    height: 45,
    width: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: "#fff",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  }
});

const mapStateToProps = (state) => ({
  callData: state.user.callData,
});

const mapDispatchToProps = (dispatch) => ({
  endCall: () => dispatch(actionCreators.endCall()),
  setCallActive:()=>dispatch(actionCreators.setCallActive(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(CallScreen);