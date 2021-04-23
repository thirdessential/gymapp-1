import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import auth,{firebase} from '@react-native-firebase/auth';
import {LoginManager, AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import { View, Alert } from 'react-native';

import {webClientId} from "../constants/appConstants";
import {showError, showInfo} from "../utils/notification";
import strings from "../constants/strings";

// Handles new and existing users
export const attemptGoogleAuth = async () => {
  try {
    await GoogleSignin.configure({webClientId});
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
    // console.log(data,result,"res and data")
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    // Sign-in the user with the 
    const profile = await getFacebookProfile()

      const { email, name } = profile
      // firebase.auth().signInWithCredential(facebookCredential).then(firebaseUserCredential =>{
      //   console.log(firebaseUserCredential,'facebookCredentialfacebookCredential')
      // return firebaseUserCredential.user.linkWithCredential(facebookCredential)
      return auth().signInWithCredential(facebookCredential)

      // }).catch(err=>{
      //   console.log(err,"errerer")
      // // })
    // return await firebase.auth().signInWithCredential(facebookCredential).catch(err=>{
    //     // console.log(err,"errerer")
        
    //     Alert.alert('Facebook', "Looks like you previously signed in via Google. You'll need to sign-in there to continue", [
    //       { text: 'Cancel', style: 'cancel' },
    //       { text: 'Continue', onPress:async () => await fberr(facebookCredential) }
    //     ])
    //   })
      // console.log(facebookCredential,"const googleCredential = auth.GoogleAuthProvider.credential(idToken);")
  //  let results = await fberr(facebookCredential);
  //  return results
// signInWithCredential(facebookCredential, email, name)
    // return auth().signInWithCredential(facebookCredential);
    // return auth().linkWithCredential(facebookCredential);

  } catch (error) {
    console.log(error,'facebook error');
  }
}


async function fberr(credientials) {
  await GoogleSignin.configure({webClientId});
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  firebase.auth().signInWithCredential(googleCredential).then(firebaseUserCredential =>{
    console.log(firebaseUserCredential,'facebookCredentialfacebookCredential')
  return firebaseUserCredential.user.linkWithCredential(credientials)

  }).catch(err=>{
    console.log(err,"errerer")
  })
}

let linkedCredential = null
async function signInWithCredential (credential, email, displayName) {

  // login with credential
  firebase.auth().signInWithCredential(credential).then(firebaseUserCredential => {

    if (linkedCredential) {
      firebaseUserCredential.user.linkWithCredential(linkedCredential)
      linkedCredential=null
    }

    if (displayName) {
      firebaseUserCredential.user.updateProfile({ displayName })
    }

  }).catch(async (error) => {
    if (error.code === 'auth/account-exists-with-different-credential') {
      if (email) {
        firebase.auth().fetchSignInMethodsForEmail(email).then(providers => {
          console.log('PROVIDERS=', providers,email)
          linkedCredential = credential
          // this.setState({ linkedCredential: credential }, () => {
            if (providers.includes('apple.com') && appleAuth.isSupported) {
             alert('Sign-in via Apple', "Looks like you previously signed in via Apple. You'll need to sign-in there to continue", [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Continue', onPress: () => this.appleLogin() }
              ])
            } else if (providers.includes('google.com')) {
              attemptGoogleAuth()
            } else if (providers.includes('facebook.com')) {
              onFacebookButtonPress()
            } else {
              alert('Login Error', 'Sign in using a different provider')
            }
          // })
        })
      } else {
        alert('Login Error', 'Unable to sign in using account, could not determine email')
      }
    } else {
      alert('Login Error', error.toString())
    }
  })
}


async function getFacebookProfile () {
  return new Promise(resolve => {
    const infoRequest = new GraphRequest(
      '/me?fields=email,name',
      null,
      (error, result) => {
        if (error) {
          console.log('Error fetching data: ' + error.toString())
          resolve(null)
          return
        }

        resolve(result)
      }
    )
    new GraphRequestManager().addRequest(infoRequest).start()
  })
}
