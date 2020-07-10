// import {showMessage, hideMessage} from "react-native-flash-message";
// import SocketIOClient from "socket.io-client";
// import {CHANNELS, rootURL} from "../constants/appConstants";
import {navigate} from '../navigation/RootNavigation';
import RouteNames from "../navigation/RouteNames";
import AsyncStorage from '@react-native-community/async-storage';

import store from '../store/configureStore';
import {makeCall} from "../API";
import strings from "../constants/strings";
import {defaultDP, userTypes, WEEK_DAYS} from "../constants/appConstants";
import ImagePicker from "react-native-image-picker";
import {showError} from "./notification";
import {useCode} from "react-native-reanimated";

export const validateResponseCode = (code) => {
  return Math.floor(code / 100) === 2;
};

export const formattedTime = date => {
  let dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const AM_PM = hours >= 12 ? 'PM' : 'AM';
  let minZero = minutes === 0 ? '0' : '';
  return `${hours}:${minutes}${minZero} ${AM_PM}`;
}

export const militaryTimeToString = time => {
  if (!time) return '';
  const suffix = time >= 1200 ? 'PM' : 'AM';
  return `${time.slice(0, 2)}:${time.slice(2)} ${suffix}`;
}

export const findMissingDays = days => {
  let AllDays = Object.values(WEEK_DAYS);
  return AllDays.filter(x => !days.includes(x));
}

export const formatTimeArray = array => {
  if (!array) return [];
  return array.map(time => militaryTimeToString(time));
}

export const stringToMilitaryTime = str => {
  return `${str.slice(0, 2)}${str.slice(3, 5)}`;
}

export const dateToString = time => {
  let dateObj = new Date(time);
  let hours = dateObj.getHours();
  let prependedZeroToHours = hours >= 10 ? '' : '0';
  let minutes = dateObj.getMinutes();
  let prependedZeroToMinutes = minutes >= 10 ? '' : '0';

  return `${prependedZeroToHours}${hours}${prependedZeroToMinutes}${minutes}`;
}

export const stringToDate = time => {
  const hours = parseInt(time.slice(0, 2));
  const minutes = parseInt(time.slice(2));
  let dateObj = new Date();
  dateObj.setHours(hours);
  dateObj.setMinutes(minutes);
  return dateObj;
}


export const saveToStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
    return true;
  } catch (e) {
    console.log("Storing data to storage failed", e);
    return false;
  }
}

export const readFromStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Reading data from storage failed", e);
    return false;
  }
}
export const deleteFromStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}

export const textSlicer = (text, length) => {
  if (!text) return "";
  if (length < 0) return text;
  if (text.length > length) {
    text = text.slice(0, length) + " ...";
  }
  return text;
};

export const getOSPath = (path) => {
  if (path.includes("content")) return path;
  return Platform.OS === "android" ? "file:/" + path : path;
};

export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues,
  };
};

export const initialiseVideoCall = async (userId, displayName = "Yatan", displayPictureUrl = defaultDP) => {
  let result = await makeCall(userId);
  if (!result.success) {
    showError(result.message);
    console.log("TargetBusy");
    return false;
  }
  if (!result) {
    console.log("Call initiate error");
    return false;
  }
  const {sessionId, agoraAppId} = result;
  const user = store.getState().app.users[userId];
  if (user) {
    displayName = user.name;
    displayPictureUrl = user.displayPictureUrl;
  }
  navigate(RouteNames.VideoCall, {
    AppID: agoraAppId,
    ChannelName: sessionId,
    initiating: true,
    displayPictureUrl,
    displayName
  })
}

export const customDelay = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

export const toTitleCase = (str) => {
  if (!str) return ''
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
// coolest snippet i ever found, felt i should link source
// https://www.tutorialspoint.com/most-efficient-method-to-groupby-on-an-array-of-objects-in-javascript
export const groupBy = (objectArray, property) => { // coolest snippet i ever found, felt i should link source
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    // Add object to list for given key's value
    acc[key].push(obj);
    return acc;
  }, {});
}

export const generateTrainerHits = ({post, transformation, program, slot}) => ([
  {
    title: strings.POSTS,
    count: post || 0
  },
  {
    title: strings.MAKEOVERS,
    count: transformation || 0
  },
  {
    title: strings.PROGRAMS,
    count: program || 0
  },
  {
    title: strings.SLOTS,
    count: slot || 0
  }
]);

export const generateUserHits = ({post, subscription}) => ([
  {
    title: strings.POSTS,
    count: post || 0
  },
  {
    title: strings.SUBSCRIPTIONS,
    count: subscription || 0
  }
]);

export const pickImage = async (callback) => {
  const options = {};
  ImagePicker.showImagePicker(options, callback);
}

export const getJoinDuration = (date) => {
  const now = new Date();
  const joinDate = new Date(date);
  return Math.floor((now.getTime() - joinDate.getTime()) / (1000 * 3600 * 24));
}

export const getJoinDurationString = (date, userType) => {
  const entity = userType === userTypes.USER ? 'User' : 'Trainer';
  return `${entity} for ${getJoinDuration(date)} days`;
}

export const dayTimeSorter = (alpha, beta) => {
  let todayIndex = (new Date()).getDay();
  let {day: d1, time: t1} = alpha;
  if (!d1) d1 = alpha.dayOfWeek;
  const alphaTime = new Date();
  alphaTime.setDate(alphaTime.getDate() + (todayIndex - Object.keys(WEEK_DAYS).indexOf(d1) ));
  alphaTime.setTime(alphaTime.getTime() +parseInt(t1)); // this is fine as any number will work, we just have to find which is greater

  let {day: d2, time: t2} = beta;
  if (!d2) d2 = beta.dayOfWeek;

  const betaTime = new Date();
  betaTime.setDate(betaTime.getDate() + (todayIndex - Object.keys(WEEK_DAYS).indexOf(d2) ));
  betaTime.setTime(betaTime.getTime() +parseInt(t2)); // this is fine as any number will work, we just have to find which is greater

  return betaTime-alphaTime;
}