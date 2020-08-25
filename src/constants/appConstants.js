import {cardBackgrounds} from "./images";
import {appTheme, bmiColors} from "./colors";


let apiUrl = '';
if (__DEV__) {
  console.log('Development Server');
  // apiUrl = 'https://fitness-first-services.herokuapp.com';
  apiUrl = 'http://192.168.31.125:3001';
} else {
  console.log('Production Server');
  apiUrl = 'https://fitness-first-services.herokuapp.com';
}
export const rootURL = apiUrl;
export const appName = 'GymAdda';

export const userTypes = {
  USER: 'USER',
  TRAINER: 'TRAINER'
}
export const INITIAL_USER_TYPE = userTypes.TRAINER;
export const videoFeedConfig = {
  width: 360,
  height: 640,
  bitrate: 600,
  FPS: 30
}
export const appPackageId = 'com.thirdessential.fitnessfirst';

export const notificationActions = {
  Accept: 'Accept',
  Reject: 'Reject'
}

export const storageKeys = {
  PENDING_CALL: 'PENDING_CALL',
  PENDING_NOTIFICATIONS:'PENDING_NOTIFICATIONS'
}
export const webClientId = '284208119571-nt9fitb9l2o4qulefvju8gqeo7aaug01.apps.googleusercontent.com';

export const videoTestMode = false;
export const callTimeout = 30000; //30 secs

export const WEEK_DAYS = {
  SUN: 'SUN',
  MON: 'MON',
  TUE: 'TUE',
  WED: 'WED',
  THU: 'THU',
  FRI: 'FRI',
  SAT: 'SAT',
};
export const WEEK_DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
export const allowedDurations = [30, 45, 60];

export const imageTypes = {
  AVATAR: {
    type: 'AVATAR',
    dimension: {
      width: 400,
      height: 400
    }
  },
  COVER: {
    type: 'COVER',
    dimension: {
      height: 700,
      width: 800
    }
  }
}
export const defaultDP = 'https://media.istockphoto.com/photos/middle-aged-gym-coach-picture-id475467038';
export const paymentKey = 'rzp_test_BuIiL164HHvbBm';

export const remoteMessageTypes = {
  CALL: 'call',
  APPOINTMENT: "appointmentNotification",
  SESSION: 'sessionNotification',
  UPDATE_POSTS: 'UPDATE_POSTS',
  GENERIC_NOTIFICATION: 'GENERIC_NOTIFICATION',
  CALLBACK_REQ: 'CALLBACK_REQ',
  CALLBACK_ACCEPT: 'CALLBACK_ACCEPT',
}

export const INITIAL_PAGE = 'INITIAL_PAGE';

export const MAX_POST_LENGTH = 300;
export const firebaseTopics = {
  SILENT_NOTIFICATION: 'SILENT_NOTIFICATION',
  DISPLAY_NOTIFICATION: 'DISPLAY_NOTIFICATION',
}
export const POST_TYPE = {
  TYPE_POST: 'TYPE_POST',
  TYPE_WORKOUT: 'TYPE_WORKOUT',
  TYPE_QUESTION: 'TYPE_QUESTION',
  TYPE_VIDEO: 'TYPE_VIDEO',
  TYPE_STREAM: 'TYPE_STREAM',
}
export const CONTENT_TYPE = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO'
}
export const COUPON_GEN = {
  minGen: 1,
  maxGen: 10,
  minDiscount: 3,
  maxDiscount: 100,
  minValidity: 1,
  maxValidity: 6
}
export const packageTypes = {
  FAT_LOSS: 'Fat Loss',
  WEIGHT_LOSS: 'Weight Loss',
  WEIGHT_GAIN: 'Weight Gain',
  MUSCLE_GAIN: 'Muscle Gain',
  BODY_MASS_GAIN: 'Body Mass Gain',
  LEAN_BODY_MASS: 'Lean Body Mass',
  POWER_LIFTING: 'Power Lifting',
  STRENGTH_GAIN: 'Strength Gain'
}
export const packageImages = {
  FAT_LOSS: cardBackgrounds.bg1,
  WEIGHT_LOSS: cardBackgrounds.bg2,
  WEIGHT_GAIN: cardBackgrounds.bg3,
  MUSCLE_GAIN: cardBackgrounds.bg4,
  BODY_MASS_GAIN: cardBackgrounds.bg5,
  LEAN_BODY_MASS: cardBackgrounds.bg6,
  POWER_LIFTING: cardBackgrounds.bg7,
  STRENGTH_GAIN: cardBackgrounds.bg8
}
export const callbackStatus = {
  REQUESTED: 'REQUESTED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED'
}

export const fitnessCategories = {
  YOGA: 'YOGA',
  STRETCH: 'STRETCH',
  WORKOUT: 'WORKOUT',
  CARDIO: 'CARDIO'
}

export const bodyParts = {
  ABS: 'ABS',
  ARMS: 'ARMS',
  BACK: 'BACK',
  BUTTOCKS: 'BUTTOCKS',
  CHEST: 'CHEST',
  FULL_BODY: 'FULL_BODY',
  SHOULDERS: 'SHOULDERS',
  LEGS: 'LEGS',
}

export const exerciseLevels = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED'
}

export const equipmentTypes = {
  DUMBBELL: 'DUMBBELL',
  BENCH: 'BENCH',
  BAND: 'BAND',
  ALL: 'ALL'
}

export const zoomConfig = {
  key: 'hKodHeKdo7c0g7Qh4Dx5MnQMp6j19tc1WGbs',
  secret: 'Pxu4Jq7BjGG50kXxoDizV1FkAcLxdwTmDtPq',
  userId: 'oggybuddy10@gmail.com',
  domain: 'zoom.us'
}

export const streamStatus = {
  SCHEDULED: 'SCHEDULED',
  LIVE: 'LIVE',
  FINISHED: 'FINISHED'
}
export const streamText = {
  SCHEDULED: 'UPCOMING',
  LIVE: 'LIVE',
  FINISHED: 'FINISHED'
}
export const streamStatusColor = {
  SCHEDULED: bmiColors.redFaded,
  LIVE: appTheme.live,
  FINISHED: appTheme.darkGrey
}
export const notificationActionTypes = {
  STREAM:'STREAM',
  CALL_REQUEST:'CALL_REQUEST',
  CALL_ACCEPT:'CALL_ACCEPT'
}
export const subscriptionType = {
  SINGLE:'SINGLE',
  BATCH:'BATCH'
}
