import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
  AppState, Image, LayoutAnimation,
} from 'react-native';
import RtcEngine, {RtcLocalView, RtcRemoteView} from 'react-native-agora';

import Icon from 'react-native-vector-icons/MaterialIcons';
import KeepAwake from 'react-native-keep-awake';
import AndroidPip from 'react-native-android-pip';

import {callTimeout, videoFeedConfig} from "../../constants/appConstants";
import strings from "../../constants/strings";
import {customDelay} from "../../utils/utils";
import * as actionCreators from "../../store/actions";
import {connect} from "react-redux";
import {screenHeight, screenWidth} from "../../utils/screenDimensions";
import colors, {appTheme} from "../../constants/colors";
import {showError} from "../../utils/notification";
import {ToggleView} from "react-native-full-screen";
import {spacing} from "../../constants/dimension";
import Avatar from "../../components/Avatar";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import CallBackground from "../../../assets/images/callBackground.png";
import {setAvailable, setBusy} from "../../API"; //Set defaults for Stream

let LocalView = RtcLocalView.SurfaceView;
let RemoteView = RtcRemoteView.SurfaceView;
let engine;

class VideoCall extends Component {
  constructor(props) {
    super(props);
    const {params} = props.route;
    const {
      AppID,
      ChannelName,
      videoConfig = videoFeedConfig,
      initiating = false
    } = params;

    this.state = {
      peerIds: [],                                //Array for storing connected peers
      appid: AppID,                               //Enter the App ID generated from the Agora Website
      channelName: ChannelName,                   //Channel Name for the current session
      vidMute: false,                             //State variable for Video Mute
      audMute: false,                             //State variable for Audio Mute
      joinSucceed: false,                         //State variable for storing success
      appState: 'active',
      initiating: initiating,
    };
  }

  handleCallTimeout = async () => {
    if (this.state.peerIds.length === 0) {
      showError(strings.CALL_TIMEOUT)
      await customDelay(1000);
      this.endCall();
    }
  }

  switchCamera = () => {
    engine.switchCamera();
  }

  componentDidMount() {
    AndroidPip.enableAutoPipSwitch();
    this.callTimeouter = setTimeout(()=>this.handleCallTimeout(), callTimeout);

    AppState.addEventListener("change", this._handleAppStateChange);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
      AndroidPip.enterPictureInPictureMode();
      return true;
    });

    let self = this;

    async function init() {
      engine = await RtcEngine.create(self.state.appid);
      engine.enableVideo();

      engine.addListener('UserJoined', (data) => {          //If user joins the channel
        const {peerIds} = self.state;                     //Get currrent peer IDs
        if (peerIds.indexOf(data) === -1) {                 //If new user
          self.setState({peerIds: [...peerIds, data]});   //add peer ID to state array
        }
      });

      engine.addListener('UserOffline', (data) => {                 //If user leaves
        self.setState({
          peerIds: self.state.peerIds.filter(uid => uid !== data), //remove peer ID from state array
        });
        self.endCall();
      });

      engine.addListener('JoinChannelSuccess', (data) => {          //If Local user joins RTC channel
        self.setState({joinSucceed: true});                       //Set state variable to true
        setBusy();
      });
      engine.joinChannel(null, self.state.channelName, null, 0);  //Join Channel using null token and channel name
    }

    init();
  }

  componentWillUnmount() {
    setAvailable();
    this.backHandler.remove();
    clearTimeout(this.callTimeouter);
    AndroidPip.disableAutoPipSwitch();
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.forceUpdate();
      console.log("App has come to the foreground!");
    }
    this.setState({appState: nextAppState});
  };

  /**
   * @name toggleAudio
   * @description Function to toggle local user's audio
   */
  toggleAudio() {
    let mute = this.state.audMute;
    console.log('Audio toggle', mute);
    engine.muteLocalAudioStream(!mute);
    this.setState({
      audMute: !mute,
    });
  }

  /**
   * @name toggleVideo
   * @description Function to toggle local user's video
   */
  toggleVideo() {
    let mute = this.state.vidMute;
    console.log('Video toggle', mute);
    this.setState({
      vidMute: !mute,
    });
    engine.muteLocalVideoStream(!this.state.vidMute);
  }

  /**
   * @name endCall
   * @description Function to end the call
   */
  endCall() {
    engine.leaveChannel();
    setAvailable();
    this.setState({peerIds: [], joinSucceed: false});

    const {navigation} = this.props;
    if (navigation.canGoBack())
      navigation.pop();
    this.props.endCall();
  }


  renderRemoteUser = () => {
    return (
      <View style={{flex: 1}}>
        <RemoteView style={{flex: 1}}
                    uid={this.state.peerIds[0]} renderMode={1}/>
      </View>
    )
  }

  renderInitiation = () => {
    const {params} = this.props.route;
    const {
      displayPictureUrl,
      displayName
    } = params;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {
          this.state.vidMute || this.state.joinSucceed === false ?
            <Image source={CallBackground} style={{width: screenWidth, height: screenHeight}}/>
            : <LocalView style={{width: screenWidth, height: screenHeight}}               //view for local videofeed
                         channelId={this.state.channelName} renderMode={1} zOrderMediaOverlay={true}/>
        }

        {this.state.initiating && (
          <View style={styles.userCreds}>
            <Avatar size={spacing.thumbnailMed} url={displayPictureUrl}/>
            <View style={{alignItems: 'center', margin: spacing.medium_sm}}>
              <Text style={styles.displayName}>{displayName}</Text>
              <Text style={styles.ringing}>{strings.RINGING}</Text>
            </View>
          </View>
        )}
      </View>
    )
  }

  renderLocalUser = () => {
    if (this.state.peerIds.length === 0)
      return this.renderInitiation();

    return !this.state.vidMute                                              //view for local video
      ? (
        <View style={[styles.localContainer, styles.shadow]}>
          <LocalView style={styles.localVideoStyle}               //view for local videofeed
                     channelId={this.state.channelName} renderMode={1} zOrderMediaOverlay={true}/>
          <TouchableOpacity
            style={[styles.toggleButton, styles.shadow]}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            onPress={() => this.toggleAudio()}>
            <Icon
              name={'switch-camera'}
              onPress={() => this.switchCamera()}
              color="white"
              size={20}/>
          </TouchableOpacity>
        </View>
      )
      : <View/>
  }

  renderButtonBar = () => {
    return (
      <View style={styles.buttonBar}>
        <TouchableOpacity
          style={[styles.utilityButton, styles.shadow]}
          activeOpacity={0.7}
          onPress={() => this.toggleAudio()}>
          <Icon
            name={this.state.audMute ? 'mic-off' : 'mic'}
            color="white"
            size={30}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.rejectButton, styles.shadow, {backgroundColor: colors.rejectRed}]}
          activeOpacity={0.7}
          onPress={() => this.endCall()}>
          <Icon name="call" color="white" size={30}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.utilityButton, styles.shadow]}
          activeOpacity={0.7}
          onPress={() => this.toggleVideo()}
        >
          <Icon
            name={this.state.vidMute ? 'videocam-off' : 'videocam'}
            color="white"
            size={30}/>
        </TouchableOpacity>
      </View>
    )
  }

  /**
   * @name videoView
   * @description Function to return the view for the app
   */
  videoView = () => {
    return (
      <View style={styles.container}>
        <KeepAwake/>
        {
          this.state.peerIds.length > 0
            ? this.renderRemoteUser()
            : null
        }
        {this.renderLocalUser()}
        {this.renderButtonBar()}
      </View>
    );
  }

  pipView = () => {
    const localVideoStyle = {flex: 1};
    if (this.state.peerIds.length > 0)
      return this.renderRemoteUser();
    else
      return !this.state.vidMute
        ? <LocalView style={localVideoStyle}
                     channelId={this.state.channelName} renderMode={1} zOrderMediaOverlay={true}/>
        : <View/>
  }

  render() {
    // return <View/>
    // return   <LocalView style={styles.localVideoStyle}               //view for local videofeed
    //                     channelId={this.state.channelName} renderMode={1} zOrderMediaOverlay={true}/>;
    if (this.state.appState === 'active')
      return (
        <ToggleView key={1} delayHide={true} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {this.videoView()}
        </ToggleView>
      )
    return <this.pipView key={2}/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
    backgroundColor: appTheme.darkBackground,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonBar: {
    width: '100%',
    position: 'absolute',
    bottom: spacing.large_lg,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingRight: spacing.large_lg,
    paddingLeft: spacing.large_lg,
    marginBottom: spacing.large_lg,
    alignContent: 'center',
    zIndex: 1000
  },
  localContainer: {
    position: 'absolute',
    top: spacing.large_lg,
    right: spacing.medium_lg,
    zIndex: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  localVideoStyle: {
    width: 110,
    height: 150,
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
  },
  rejectButton: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    zIndex: 100,
  },
  utilityButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: '#41434fbb',
    zIndex: 100,
  },
  toggleButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: colors.appBlue,
    zIndex: 100,
    position: 'absolute',
    bottom: -20,
    right: 55 - 20
  },
  userCreds: {
    position: 'absolute',
    top: screenHeight / 8,
    alignItems: 'center'
  },
  displayName: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular,
  },
  ringing: {
    color: 'white',
    fontSize: fontSizes.h3,
    fontFamily: fonts.PoppinsRegular,
  }
});

const mapStateToProps = (state) => ({
  inAppCall: state.call.inAppCall
});

const mapDispatchToProps = (dispatch) => ({
  endCall: () => dispatch(actionCreators.endCall()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoCall);