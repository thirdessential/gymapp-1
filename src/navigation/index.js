import React from 'react';
import {AppState} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from "react-redux";
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

const PushNotification = require("react-native-push-notification");

const Stack = createStackNavigator();
import * as actionCreators from '../store/actions';

import RouteNames from "./RouteNames";
import UserListing from "../screens/App/UserListing";
import Profile from "../screens/App/Profile";
import Packages from "../screens/App/Packages";
import Splash from "../screens/Auth/Splash";
import LoginTwo from "../screens/Auth/LoginTwo";
import SignupTwo from "../screens/Auth/SignupTwo";
import Listings from "../screens/Auth/Listings";

import SignInWithRegisteredEmail from "../screens/Auth/SignInWithRegisteredEmail";
import EmailVerification from "../screens/Auth/EmailVerification";
import TrainerSignupDetails from "../screens/Auth/TrainerSignupDetails";
import TrainerHomeScreen from "../screens/Auth/TrainerHomeScreen";
import {updateAxiosToken} from "../API";
import VideoCall from "../screens/Call/VideoCall";
import VideoTester from "../screens/Call/VideoTester";
import {navigationRef} from './RootNavigation';
import {storageKeys, videoTestMode} from "../constants/appConstants";
import ChooseUserType from "../screens/Auth/ChooseUserType";
import {callHandler, configureFCMNotification, LocalNotification} from "../utils/notification";
import {deleteFromStorage, readFromStorage, saveToStorage} from "../utils/utils";
import ReceivingCall from "../screens/Call/CallScreen";
import CallScreen from "../screens/Call/CallScreen";

messaging().setBackgroundMessageHandler(callHandler);
configureFCMNotification();

const noHeader = {title: '', headerStyle: {height: 0}}

class App extends React.Component {
  state = {
    loading: true,
    videoTestMode, // set this to true to enter video testing mode,
  }

  async componentDidMount() {
    // this.props.resetUser();this.props.resetAuth()
    const {setAuthenticated, setIncomingCall} = this.props;
    setAuthenticated(false); // TODO: Remove this line and fix auth blacklisting
    this.authSubscriber = auth().onAuthStateChanged(this.onAuthStateChanged);
    this.syncing = false;
    await this.checkCallData();
    AppState.addEventListener("change", this._handleAppStateChange);
    messaging().onMessage(async remoteMessage => {
      console.log("Remote message received in app", remoteMessage);
      this.props.setIncomingCall(remoteMessage.data);
    })
  }

  checkCallData = async () => {
    const callData = await readFromStorage(storageKeys.PENDING_CALL);
    if (callData) {
      deleteFromStorage(storageKeys.PENDING_CALL);
      this.props.setIncomingCall(callData);
      console.log("Set call data", callData);
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

  videoTest = () => {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name={RouteNames.VideoTester} component={VideoTester}/>
          <Stack.Screen name={RouteNames.VideoCall} component={VideoCall} options={noHeader}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  splashScreen = () => {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name={RouteNames.Splash} component={Splash}/>
          <Stack.Screen name={RouteNames.VideoCall} component={VideoCall} options={noHeader}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  initialLoginUpScreen = () => {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="TrainerSignupDetails" component={TrainerSignupDetails}
                        options={{title: 'Enter details'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  coreApplication = () => {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name={RouteNames.UserListing} component={UserListing} options={{title: 'Overview'}}/>
          <Stack.Screen name={RouteNames.Profile} component={Profile}/>
          <Stack.Screen name={RouteNames.Packages} component={Packages}/>
          <Stack.Screen name={RouteNames.VideoCall} component={VideoCall} options={noHeader}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  authFlow = () => {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{
          headerStyle: {},
        }}
        >
          <Stack.Screen name={RouteNames.ChooseUserType} component={ChooseUserType} options={noHeader}/>
          <Stack.Screen name={RouteNames.Login} component={LoginTwo} options={{title: ''}}/>
          <Stack.Screen name={RouteNames.Signup} component={SignupTwo} options={{title: 'Sign up'}}/>
          <Stack.Screen name="Listings" component={Listings}/>
          <Stack.Screen name="signInWithRegisteredEmail" component={SignInWithRegisteredEmail}
                        options={{title: 'Sign in'}}/>
          <Stack.Screen name="EmailVerification" component={EmailVerification} options={{title: ''}}/>
          <Stack.Screen name="TrainerSignupDetails" component={TrainerSignupDetails}
                        options={{title: 'Enter details'}}/>
          <Stack.Screen name="TrainerHomeScreen" component={TrainerHomeScreen} options={{title: ''}}/>
          <Stack.Screen name={RouteNames.VideoCall} component={VideoCall} options={noHeader}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  callingScreen = () => {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name={RouteNames.CallScreen} component={CallScreen}/>
          <Stack.Screen name={RouteNames.VideoCall} component={VideoCall}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  render() {
    const {loading, videoTestMode} = this.state;
    const {authenticated, initialLogin, callData, callActive} = this.props;

    if (loading) {
      return <this.splashScreen/>
    }

    if (videoTestMode)
      return <this.videoTest/>
    let tr = callData || callActive
    console.log(tr)
    if (Object.keys(callData).length !== 0 || callActive) {
      return <this.callingScreen/>
    }

    if (authenticated) {
      if (initialLogin)
        return <this.initialLoginUpScreen/>
      else
        return <this.coreApplication/>
    }

    return <this.authFlow/>
  }
}

const mapStateToProps = (state) => ({
  authToken: state.user.authToken,
  authenticated: state.auth.authenticated,
  initialLogin: state.user.initialLogin,
  callActive: state.user.callActive,
  callData: state.user.callData
});

const mapDispatchToProps = (dispatch) => ({
  resetAuth: () => dispatch(actionCreators.resetAuth()),
  resetUser: () => dispatch(actionCreators.resetUser()),
  setAuthenticated: (value) => dispatch(actionCreators.setAuthenticated(value)),
  syncFirebaseAuth: (idToken, fcmToken) => dispatch(actionCreators.syncFirebaseAuth(idToken, fcmToken)),
  setIncomingCall: callData => dispatch(actionCreators.setIncomingCall(callData))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);