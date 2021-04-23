import React from 'react';
import {AppState, LayoutAnimation, Text} from 'react-native';
import {connect} from "react-redux";
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import * as actionCreators from '../store/actions';
import {setAvailable, updateAxiosToken} from "../API";
import {
  callbackStatus, defaultDP,
  INITIAL_PAGE, notificationActionTypes,
  remoteMessageTypes,
  storageKeys, subscriptionType,
  videoTestMode
} from "../constants/appConstants";
import {callHandler, configureFCMNotification, showInfo} from "../utils/notification";
import {deleteFromStorage, readFromStorage} from "../utils/storage";
import {appTheme} from "../constants/colors";
import {navigationRef} from './RootNavigation';
// import Jitsicall from '../screens/Call/jitsimeet'
import Stack from "./stacks/stack";
import VideoTest from './stacks/videoTestStack';
import Splash from './stacks/splashStack';
import InitialLogin from './stacks/initialLoginStack';
import Auth from './stacks/authStack';
import Calling from './stacks/callingStack';
import CustomDrawerContent from "./drawerContent";
import RouteNames from "./RouteNames";
import VideoCall from "../screens/Call/VideoCall";
import {drawerLabelStyle} from "../constants/styles";
import strings from "../constants/strings";
import {setWhatsappInstalled} from "../utils/share";
import {convertdate} from "../utils/utils";
import RootStack from "./RootStack";
import TermsStack from "./stacks/TermsStack";
// import * as RNLocalize from "react-native-localize";
// This listener is responsible for receiving, handling FCM notification when the app is closed.
messaging().setBackgroundMessageHandler(callHandler);
configureFCMNotification();
// Set a global variable indicating whether whatsapp is installed on the device
setWhatsappInstalled();
const Drawer = createDrawerNavigator();
const coreAppTheme = {
  colors: {
    primary: appTheme.lightBackground,
  },
};

class App extends React.Component {
  state = {
    loading: true, // when true, will show the splash screen
    videoTestMode, // set this to true to enter video testing mode,
    jitsimode:false
  }

  async componentDidMount() {
    const {setAuthenticated} = this.props;
    setAuthenticated(false);
    changeNavigationBarColor(appTheme.darkBackground);
    // Detect changes in auth state, fires when user is authenticated using either of auth methods
    this.authSubscriber = auth().onAuthStateChanged(this.onAuthStateChanged);
    // local variable which blocks multiple calls to syncFirebaseAuth method
    this.syncing = false;
    // Check whether a call was received when the app was closed
    await this.checkCallData();
    // Check whether a notification was received when the app was closed
    this.checkNotificationData();
    AppState.addEventListener("change", this._handleAppStateChange);
    // handles FCM notifications when the app is running
    messaging().onMessage(async remoteMessage => {
      console.log("Remote message received in app", remoteMessage);
      const {data} = remoteMessage;
      this.notificationActionHandler(data);
    })
  }

  notificationActionHandler = async (data) => {
    const {setIncomingCall, updatePosts, userId, updateLiveStreams, addNotification} = this.props;
    switch (data.type) {
      case remoteMessageTypes.CALL:
        // Switch to incoming call screen
        setIncomingCall(data, true);
        break;
      case remoteMessageTypes.APPOINTMENT:
        // Just show a basic in app notification
        const {content} = data;
        if (!!content)
          showInfo(content);
        break;
      case remoteMessageTypes.CALLBACK_REQ: {
        const {content, displayImage, sentDate} = data;
        if (!!content)
          showInfo(content);
        // Add the notification to notification reducer
        addNotification(content, displayImage, notificationActionTypes.CALL_REQUEST, sentDate)
      }
        break;
      case remoteMessageTypes.CALLBACK_ACCEPT: {
        const {content, displayImage, sentDate} = data;
        if (!!content)
          showInfo(content);
        addNotification(content, displayImage, notificationActionTypes.CALL_ACCEPT, sentDate)
      }
        break;
      case remoteMessageTypes.UPDATE_POSTS:
        // A silent FCM notification that instructs devices to refresh their feed
        if (data.userId === userId) {
          console.log("received self post update notiff, taking no action");
        } else {
          console.log("received post update notiff, updating posts");
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          await updatePosts(INITIAL_PAGE);
          showInfo(strings.NEW_POSTS);
        }
        break;
      case remoteMessageTypes.GENERIC_NOTIFICATION: {
        // A live stream was scheduled, add the notification to reducer
        const {hostId, message, displayImage, meetingNumber, meetingPassword, clientKey, clientSecret, sentDate} = data;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        await updateLiveStreams(INITIAL_PAGE);
        if (hostId != userId) {
          showInfo(message);
          addNotification(
            message,
            displayImage || defaultDP,
            notificationActionTypes.STREAM,
            sentDate,
            {
              meetingNumber,
              meetingPassword,
              clientKey,
              clientSecret
            }
          );
        }
      }
        break;
      case remoteMessageTypes.SYNC_SESSIONS: {
        console.log("Silently updating session data");
        this.props.syncSessions();
      }
        break;
      case remoteMessageTypes.SESSION_STARTED: {
        // A workout session was started, sync data and add notification
        const {message, displayImage, clientKey, clientSecret, meetingNumber, meetingPassword, sentDate, sessionType, agoraAppId, sessionId, hostName} = data;
        showInfo(message);
        this.props.syncSessions();
        if (sessionType === subscriptionType.BATCH) {
          // Zoom,Group workout
          addNotification(
            message,
            displayImage || defaultDP,
            notificationActionTypes.STREAM, // Applicable here as joining a meeting has same flow
            sentDate,
            {
              meetingNumber,
              meetingPassword,
              clientKey,
              clientSecret
            }
          );
        } else {
          // Agora, one on one workout
          addNotification(
            message,
            displayImage || defaultDP,
            notificationActionTypes.AGORA_SESSION,
            sentDate,
            {
              agoraAppId,
              sessionId,
              displayImage,
              displayName: hostName
            }
          )
        }
      }
        break;
        case remoteMessageTypes.COUPON_APPROVED: {
          const {content, displayImage, sentDate} = data;
          if (!!content)
            showInfo(content);
          // Add the notification to notification reducer
          addNotification(content, displayImage, notificationActionTypes.COUPON_APPROVED, sentDate)
        }
          break;
      default:
        break;
    }
  }
  checkCallData = async () => {
    const callData = await readFromStorage(storageKeys.PENDING_CALL);
    if (callData) {
      deleteFromStorage(storageKeys.PENDING_CALL);
      // Check whether the call was received in the past 60 seconds
      // if yes, the call is classified as ringing, ignored otherwise
      const receiveTime = convertdate(new Date(callData.receiveTime));
      const currentTime = convertdate(new Date());
      if ((currentTime - receiveTime) / 1000 < 60) { // 60 secs
        this.props.setIncomingCall(callData);
        console.log("Set call data", callData);
      } else console.log("Stale call data detected and deleted");
    }
  }
  checkNotificationData = async () => {
    // Sync up any notifications that were received when app was shut down
    const notifications = await readFromStorage(storageKeys.PENDING_NOTIFICATIONS);
    if (notifications) {
      deleteFromStorage(storageKeys.PENDING_NOTIFICATIONS);
      notifications.map(data => this.notificationActionHandler(data))
    }
  }
  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      this.checkCallData();
    }
  };
  onAuthStateChanged = async (user) => {
    const {authToken, setAuthenticated, syncFirebaseAuth} = this.props;
    console.log("Auth state changed", user);
    // FcmToken is used for sending FCM messages/notifications
    let fcmToken = await messaging().getToken();
    console.log('FCM token: ', fcmToken)
    if (user) {
      if (!!authToken) {
        // We have an auth token, set global headers using axios, setAvailable sets a flag in backend that user is ready
        // to receive calls.
        console.log('authToken present, going home');
        updateAxiosToken(authToken);
        setAuthenticated(true);
        setAvailable();
      } else {
        if (!user.emailVerified) {
          // User registered using email or facebook, send a verification link
          user.sendEmailVerification();
          showInfo(strings.SENT_VERIFICATION_MAIL + user.email);
          console.log("Sent email verification mail")
        } else {
          console.log('Verified user');
        }
        // User is authenticated, but redux store does not have auth token
        console.log("No auth token, getting one");
        let fcmToken = await messaging().getToken();
        let idToken = await auth().currentUser.getIdToken(true);
        let authSuccess;
        if (this.syncing == false) {
          this.syncing = true; // avoid multiple api calls
          authSuccess = await syncFirebaseAuth(idToken, fcmToken);
        }
        this.syncing = false;

        if (authSuccess)
          setAuthenticated(true);
        else {
        }
      }
    } else {
      setAuthenticated(false);
    }
    if (this.state.loading)
      this.setState({loading: false});
  }
  coreDrawer = () => {
    const {userType, userData, newCallbacks} = this.props;
    return (
      <Drawer.Navigator
        drawerType={'slide'}
        // All links are rendered in custom drawer content
        drawerContent={(drawerProps) =>
          <CustomDrawerContent
            {...drawerProps}
            userType={userType}
            userData={userData}
            newCallbacks={newCallbacks}
          />
        }
        drawerStyle={{
          width: 240,
        }}
      >
        <Drawer.Screen
          name={RouteNames.Home}
          component={RootStack}
          options={{
            drawerLabel: ({focused, color}) => <Text style={drawerLabelStyle}>{strings.HOME}</Text>
          }}/>
      </Drawer.Navigator>
    );
  }
  coreApplication = () => {
    return (
      <NavigationContainer theme={coreAppTheme} ref={navigationRef}>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen
            name={RouteNames.AppStack}
            component={this.coreDrawer}
          />
          {/*A separate stack for video call ensures that user is not able to interact with rest of app during call*/}
          <Stack.Screen
            name={RouteNames.VideoCall}
            component={VideoCall}
          />
          {/* <Stack.Screen
            name={RouteNames.Jitsicall}
            component={Jitsicall}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  render() {
    const {loading, videoTestMode,jitsimode} = this.state;
    const {authenticated, initialLogin, callData, callActive, termsAccepted, userType, userData} = this.props;

    if (loading)
      return <Splash/>
    if (videoTestMode)
      return <VideoTest navigationRef={navigationRef}/>
    if (authenticated) {
      // Check if call data exists, if yes, show incoming call
      if (callData && Object.keys(callData).length !== 0 || callActive) {
        return <Calling navigationRef={navigationRef}/>
      }
      // Show and accept terms
      if (!termsAccepted)
        return <TermsStack/>
      // Get user Data( Name, city, height etc)
      else if (initialLogin)
        return <InitialLogin navigationRef={navigationRef}/>
      else
        return this.coreApplication();
    }
    return <Auth navigationRef={navigationRef}/>
  }
}

const mapStateToProps = (state) => ({
  authToken: state.user.authToken,
  termsAccepted: state.user.termsAccepted,
  authenticated: state.auth.authenticated,
  initialLogin: state.user.initialLogin,
  callActive: state.call.callActive,
  callData: state.call.callData,
  userType: state.user.userType,
  userData: state.user.userData,
  userId: state.user.userId,
  newCallbacks: state.trainer.callbacks.filter(callback => callback.status === callbackStatus.REQUESTED).length > 0
});

const mapDispatchToProps = (dispatch) => ({
  setAuthenticated: (value) => dispatch(actionCreators.setAuthenticated(value)),
  syncFirebaseAuth: (idToken, fcmToken) => dispatch(actionCreators.syncFirebaseAuth(idToken, fcmToken)),
  setIncomingCall: (callData, inAppCall) => dispatch(actionCreators.setIncomingCall(callData, inAppCall)),
  updatePosts: (page) => dispatch(actionCreators.updatePosts(page)),
  updateLiveStreams: (page) => dispatch(actionCreators.updateLiveStreams(page)),
  addNotification: (text, displayImage, type, sentDate, extraData) =>
    dispatch(actionCreators.addNotification(text, displayImage, type, sentDate, extraData)),
  syncSessions: () => dispatch(actionCreators.syncSessions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);