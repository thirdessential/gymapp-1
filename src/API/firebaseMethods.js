import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

import {webClientId} from "../constants/appConstants";
import {showError, showInfo} from "../utils/notification";
import strings from "../constants/strings";

GoogleSignin.configure({webClientId});

export const attemptGoogleAuth = async () => {
  try {
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {

    } else if (error.code === statusCodes.IN_PROGRESS) {
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    } else {
    }
    console.log("Google sign in error", error);
    return false;
  }
}

export const registerWithEmail = async (email, password) => {
  try {
    const account = await auth()
      .createUserWithEmailAndPassword(email, password);
    console.log('User account created & signed in!');
    return account;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use')
      console.log('That email address is already in use!');

    if (error.code === 'auth/invalid-email')
      console.log('That email address is invalid!');

    console.log("Email register in error", error);
    return false;
  }
}

export const signInWithEmail = async (email, password) => {
  try {
    const account = await auth()
      .signInWithEmailAndPassword(email, password);
    console.log('User signed in!');
    return account;
  } catch (error) {
    console.log("Email sign in error", error);
    return false;
  }
}


export const signOutFirebase = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}


export const forgotPassword = async (email) => {
  try {
    await auth().sendPasswordResetEmail(email);
    showInfo(strings.PASSWORD_RESET_SENT + email);
    return true;
  } catch (error) {
    showError(error.message.split(' ').slice(1).join(' '));
    console.log(error.message);
    return false;
  }
}


export async function onFacebookButtonPress() {
  // Attempt login with permissions
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  } catch (error) {
    console.log(error);
  }
}
