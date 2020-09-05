import React from 'react';
import {AppState, LayoutAnimation, Text} from 'react-native';
import {connect} from "react-redux";
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import * as actionCreators from '../store/actions';
import {updateAxiosToken} from "../API";
import {
  callbackStatus,
  INITIAL_PAGE, notificationActionTypes,
  remoteMessageTypes,
  storageKeys,
  videoTestMode
} from "../constants/appConstants";
import {callHandler, configureFCMNotification, showInfo} from "../utils/notification";
import {deleteFromStorage, readFromStorage} from "../utils/storage";
import {appTheme} from "../constants/colors";
import {navigationRef} from './RootNavigation';

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
import RootStack from "./RootStack";
import TermsStack from "./stacks/TermsStack";

messaging().setBackgroundMessageHandler(callHandler);
configureFCMNotification();
setWhatsappInstalled();
const Drawer = createDrawerNavigator();
const coreAppTheme = {
  colors: {
    primary: appTheme.lightBackground,
  },
};

class App extends React.Component {
  state = {
    loading: true,
    videoTestMode, // set this to true to enter video testing mode,
  }

  async componentDidMount() {
    const {setAuthenticated} = this.props;
    // addNotification('Hola amigo a notification arrived')
    setAuthenticated(false); // TODO: Remove this line and fix auth blacklisting
    changeNavigationBarColor(appTheme.darkBackground);
    this.authSubscriber = auth().onAuthStateChanged(this.onAuthStateChanged);
    this.syncing = false;
    await this.checkCallData();
    this.checkNotificationData();
    AppState.addEventListener("change", this._handleAppStateChange);
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
        setIncomingCall(data, true);
        break;
      case remoteMessageTypes.APPOINTMENT:
        const {content} = data;
        if (!!content)
          showInfo(content);
        break;
      case remoteMessageTypes.CALLBACK_REQ: {
        const {content, displayImage, sentDate} = data;
        if (!!content)
          showInfo(content);
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
        const {hostId, message, displayImage, meetingId, meetingPassword, sentDate} = data;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        await updateLiveStreams(INITIAL_PAGE);
        if (hostId != userId) {
          showInfo(message);
          addNotification(
            message,
            displayImage,
            notificationActionTypes.STREAM,
            sentDate,
            {
              meetingId,
              meetingPassword
            }
          );
        }
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
      const receiveTime = new Date(callData.receiveTime);
      const currentTime = new Date();
      if ((currentTime - receiveTime) / 1000 < 60) { // 60 secs
        this.props.setIncomingCall(callData);
        console.log("Set call data", callData);
      } else console.log("Stale call data detected and deleted");
    }
  }
  checkNotificationData = async () => {
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
    let fcmToken = await messaging().getToken();
    console.log('fcm', fcmToken)
    if (user) {
      if (!!authToken) {
        console.log('authToken present, going home');
        updateAxiosToken(authToken);
        setAuthenticated(true);
      } else {
        if (!user.emailVerified) {
          user.sendEmailVerification();
          showInfo(strings.SENT_VERIFICATION_MAIL + user.email);
          console.log("Sent email verification mail")
        } else {
          console.log('Verified user');
        }
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
          //TODO:Handle this case
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
          name="Home"
          component={RootStack}
          options={{
            drawerLabel: ({focused, color}) => <Text style={drawerLabelStyle}>Home</Text>
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
          <Stack.Screen
            name={RouteNames.VideoCall}
            component={VideoCall}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  render() {
    const {loading, videoTestMode} = this.state;
    const {authenticated, initialLogin, callData, callActive, termsAccepted, userType, userData} = this.props;

    if (loading)
      return <Splash/>
    if (videoTestMode)
      return <VideoTest navigationRef={navigationRef}/>
    if (callData && Object.keys(callData).length !== 0 || callActive) {
      return <Calling navigationRef={navigationRef}/>
    }
    if (authenticated) {
      if (!termsAccepted)
        return <TermsStack/>
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
  resetAuth: () => dispatch(actionCreators.resetAuth()),
  setAuthenticated: (value) => dispatch(actionCreators.setAuthenticated(value)),
  syncFirebaseAuth: (idToken, fcmToken) => dispatch(actionCreators.syncFirebaseAuth(idToken, fcmToken)),
  setIncomingCall: (callData, inAppCall) => dispatch(actionCreators.setIncomingCall(callData, inAppCall)),
  updatePosts: (page) => dispatch(actionCreators.updatePosts(page)),
  updateLiveStreams: (page) => dispatch(actionCreators.updateLiveStreams(page)),
  addNotification: (text, displayImage, type, sentDate, extraData) =>
    dispatch(actionCreators.addNotification(text, displayImage, type, sentDate, extraData))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);