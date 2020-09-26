import ImagePicker from "react-native-image-picker";

import {navigate} from "../navigation/RootNavigation";
import RouteNames from "../navigation/RouteNames";
import {makeCall} from "../API";
import strings, {bmiVerdicts} from "../constants/strings";
import {defaultDP, MONTH_NAMES, userTypes, WEEK_DAY_NAMES, WEEK_DAYS} from "../constants/appConstants";
import {showError} from "./notification";
import {bmiColors} from "../constants/colors";


export const formattedTime = (date) => {
  let dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const AM_PM = hours >= 12 ? "PM" : "AM";
  let minZero = minutes === 0 ? "0" : "";
  return `${hours}:${minutes}${minZero} ${AM_PM}`;
};
export const formattedDayDate = (date) => {
  const dateObj = new Date(date);
  const dayName = WEEK_DAY_NAMES[dateObj.getDay()];
  const monthName = MONTH_NAMES[dateObj.getMonth()];
  return `${dayName}, ${monthName} ${dateObj.getDate()}`;
};
export const roundTimeQuarterHour = (time) => {
  // Round time to nearest quarter
  let timeToReturn = new Date(time);
  timeToReturn.setMilliseconds(
    Math.round(timeToReturn.getMilliseconds() / 1000) * 1000
  );
  timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
  timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 15) * 15);
  return timeToReturn;
};
//hours fomate changed to 12 hours clock
export const militaryTimeToString = (time) => {
  // Militart time expressed in HHMM, (1430, 1200 etc)
  if (!time) return "";
  const suffix = time >= 1200 ? "PM" : "AM";
  const hours = parseInt(time.slice(0, 2)) ; 
  return `${ hours > 12 ? hours - 12 : hours  }:${ time.slice(2) } ${suffix}`;
};
export const formattedMilitaryRange = (time, duration) => {
  const timeObj = new Date(time);
  timeObj.setMinutes(timeObj.getMinutes() + parseInt(duration));

  return `${formattedTime(time)}  -  ${formattedTime(timeObj)}`;
};
export const findMissingDays = (days) => {
  // Find missing days in days array
  let AllDays = Object.values(WEEK_DAYS);
  return AllDays.filter((x) => !days.includes(x));
};

export const formatTimeArray = (array) => {
  // Convert time array to military time
  if (!array) return [];
  return array.map((time) => militaryTimeToString(time));
};

export const stringToMilitaryTime = (str) => {
  return `${str.slice(0, 2)}${str.slice(3, 5)}`;
};

export const dateToString = (time) => {
  let dateObj = new Date(time);
  let hours = dateObj.getHours();
  let prependedZeroToHours = hours >= 10 ? "" : "0";
  let minutes = dateObj.getMinutes();
  let prependedZeroToMinutes = minutes >= 10 ? "" : "0";

  return `${prependedZeroToHours}${hours}${prependedZeroToMinutes}${minutes}`;
};

export const stringToDate = (time) => {
  const hours = parseInt(time.slice(0, 2));
  const minutes = parseInt(time.slice(2));
  let dateObj = new Date();
  dateObj.setHours(hours);
  dateObj.setMinutes(minutes);
  return dateObj;
};

export const textSlicer = (text, length) => {
  // Slice input text to desired length, appends ... at end
  if (!text) return "";
  if (length < 0) return text;
  if (text.length > length) {
    text = text.slice(0, length) + " ...";
  }
  return text;
};

export const getOSPath = (path) => {
  // Platform dependent file path getter
  if (path.includes("content")) return path;
  return Platform.OS === "android" ? "file:/" + path : path;
};

export const updateObject = (oldObject, updatedValues) => {
  // Utility method for merging old and new redux state
  return {
    ...oldObject,
    ...updatedValues,
  };
};

export const initialiseVideoCall = async (userId) => {
  // Initiate agora calls and navigate to route
  let result = await makeCall(userId);
  if (!result.success) {
    showError(result.message);
    console.log("TargetBusy");
    return false;
  }
  if (!result) {
    console.log("Call initiate error");
    showError(strings.COULD_NOT_INITIATE_CALL);
    return false;
  }
  console.log(result);
  let {sessionId, agoraAppId, displayPictureUrl, displayName} = result;
  if (!displayPictureUrl) displayPictureUrl = defaultDP;
  navigate(RouteNames.VideoCall, {
    AppID: agoraAppId,
    ChannelName: sessionId,
    initiating: true,
    displayPictureUrl,
    displayName,
  });
};

// use it like this in any async method: await customDelay(100)
export const customDelay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export const toTitleCase = (str) => {
  if (!str) return "";
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
// coolest snippet i ever found, felt i should link source
// https://www.tutorialspoint.com/most-efficient-method-to-groupby-on-an-array-of-objects-in-javascript
export const groupBy = (objectArray, property) => {
  // coolest snippet i ever found, felt i should link source
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    // Add object to list for given key's value
    acc[key].push(obj);
    return acc;
  }, {});
};

export const generateTrainerHits = ({post, transformation, program, slot}) => [
  {
    title: strings.POSTS,
    count: post || 0,
  },
  {
    title: strings.MAKEOVERS,
    count: transformation || 0,
  },
  {
    title: strings.PROGRAMS,
    count: program || 0,
  },
  {
    title: strings.SLOTS,
    count: slot || 0,
  },
];

export const generateUserHits = ({post, subscription}) => [
  {
    title: strings.POSTS,
    count: post || 0,
  },
  {
    title: strings.SUBSCRIPTIONS,
    count: subscription || 0,
  },
];

export const pickImage = async (callback) => {
  const options = {};
  ImagePicker.showImagePicker(options, callback);
};

export const getJoinDuration = (date) => {
  const now = new Date();
  const joinDate = new Date(date);
  return Math.floor((now.getTime() - joinDate.getTime()) / (1000 * 3600 * 24));
};

export const getJoinDurationString = (date, userType) => {
  // Shows since how many days has user been part of platform
  const entity = userType === userTypes.USER ? "User" : "Trainer";
  return `${entity} for ${getJoinDuration(date)} days`;
};

export function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export const sortDays = (arr) => {
  const list = Object.keys(WEEK_DAYS);
  return list.filter((each) => arr.includes(each));
};

export const getBmiVerdict = (bmi) => {
  // Takes a bmi value and determines the status of user(healthy, obese etc)
  if (bmi < 18.5) return {text: bmiVerdicts.low, color: bmiColors.blue};
  if (bmi < 25)
    return {text: bmiVerdicts.healthy, color: bmiColors.lightBlue};
  if (bmi < 30) return {text: bmiVerdicts.high, color: bmiColors.yellow};
  else return {text: bmiVerdicts.unhealthy, color: bmiColors.red};
};

export function calculateBmi(weight, height) {
  weight = parseInt(weight);
  height = parseInt(height);
  if (weight > 0 && height > 0) {
    return (weight / (((height / 100) * height) / 100)).toPrecision(3);
  }
  return 0;
}

export const getThumbnail = (url, height = 400, width = 400) => {
  const compressedUrl = getCompressedLink(url, height, width);
  return compressedUrl.substr(0, compressedUrl.lastIndexOf(".")) + ".jpg";
};
export const getCompressedLink = (url, height = 400, width = 400) => {
  // works only on cloudinary images, get image with input dimensions
  const split = url.split("upload");
  return split[0] + `upload/w_${width},h_${height}` + split[1];
};

export const getFormattedDate = (date = new Date()) => {
  date = new Date(date);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  date = dd + "-" + mm + "-" + yyyy;
  return date;
};

const getDaysArray = function (start, end) {
  // get array of dates between start and end(both included)
  let a = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    a.push(new Date(d));
  }
  return a;
};

export const getPastWeekDates = () => {
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 6);
  return getDaysArray(weekAgo, now);
}

export const getImageFromCloudinaryPdf = (url) => {
  // Input-> pdf url hosted on cloudinary
  // Output->First page of pdf as image
  return url.split("pdf")[0] + "jpg";
};

export const fillArray = (value, len = 10) => {
  // Return an array filled with len instances of value
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}

export const formatSeconds = remainingSeconds => {
  const hours = Math.floor(remainingSeconds / 3600);
  remainingSeconds %= 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  remainingSeconds %= 60;
  const seconds = Math.floor(remainingSeconds);

  return hours.toString().padStart(2, '0') + ':' +
    minutes.toString().padStart(2, '0') + ':' +
    seconds.toString().padStart(2, '0');
}

export const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

