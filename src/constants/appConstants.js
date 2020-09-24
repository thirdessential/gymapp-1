import {cardBackgrounds} from "./images";
import {appTheme, bmiColors} from "./colors";

export const TermsURL = "https://gymadda-web.herokuapp.com/terms"
let apiUrl = 'http://192.168.211.1:3001';
if (__DEV__) {
  console.log('Development Server');
  apiUrl = 'https://gymaddaservices.herokuapp.com';
  // apiUrl = 'http://192.168.211.1:3001';
} else {
  console.log('Production Server');
  apiUrl = 'https://gymaddaservices.herokuapp.com';
  // apiUrl = 'https://fitness-first-services.herokuapp.com';
}
export const rootURL = apiUrl;
export const appName = 'GymAdda';

export const userTypes = {
  USER: 'USER',
  TRAINER: 'TRAINER'
}

// Change this constant to change the apk type, will not affect flow when logging in with existing account
// This constant will only affect new registrations
export const INITIAL_USER_TYPE = userTypes.TRAINER;
// Default Agora video config
export const videoFeedConfig = {
  width: 360,
  height: 640,
  bitrate: 600,
  FPS: 30
}
// Change this android package id if it changes in android directory, this constant is required to launch app in agora calls
export const appPackageId = 'com.thirdessential.gymadda';
// Agora ringing notification actions
export const notificationActions = {
  Accept: 'Accept',
  Reject: 'Reject'
}
// Async storage keys
export const storageKeys = {
  PENDING_CALL: 'PENDING_CALL',
  PENDING_NOTIFICATIONS: 'PENDING_NOTIFICATIONS'
}
// WebClientId required for GoogleSignin. Derived from android/app/google-services.json
export const webClientId = '284208119571-nt9fitb9l2o4qulefvju8gqeo7aaug01.apps.googleusercontent.com';

// To enable agora call quality tester mode
export const videoTestMode = false;
// After callTimeout ms, agora call will disconnect if no user joins
export const callTimeout = 40000; //40 secs

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

// Allowed session durations in minutes
export const allowedDurations = [30, 45, 60];

// Dimensions of user DP(Avatar) and user Wall image(cover)
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
export const defaultDP = 'https://i.stack.imgur.com/l60Hf.png';
// Razorpay paymentKey
export const paymentKey = 'rzp_test_BuIiL164HHvbBm';

// Remote FCM notifications
export const remoteMessageTypes = {
  CALL: 'call',
  APPOINTMENT: "appointmentNotification",
  SESSION: 'sessionNotification',
  UPDATE_POSTS: 'UPDATE_POSTS',
  GENERIC_NOTIFICATION: 'GENERIC_NOTIFICATION',
  CALLBACK_REQ: 'CALLBACK_REQ',
  CALLBACK_ACCEPT: 'CALLBACK_ACCEPT',
  SYNC_SESSIONS: 'SYNC_SESSIONS',
  SESSION_STARTED: 'SESSION_STARTED',
}
// Default pagination value
export const INITIAL_PAGE = 'INITIAL_PAGE';
// Max number of chars in a text post
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
// Coupon generator config
export const COUPON_GEN = {
  minGen: 1,
  maxGen: 10,
  minDiscount: 3,
  maxDiscount: 100,
  minValidity: 1,
  maxValidity: 6
}
// Types of packages and their associated images
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
// Used in request call back feature
export const callbackStatus = {
  REQUESTED: 'REQUESTED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED'
}
// Exercise module categories
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
  // config stored in backend
  domain: 'zoom.us'
}
// Status of stream or live sessions
export const streamStatus = {
  SCHEDULED: 'SCHEDULED',
  LIVE: 'LIVE',
  FINISHED: 'FINISHED'
}
export const sessionStatus = {
  SCHEDULED: 'SCHEDULED',
  LIVE: 'LIVE',
  FINISHED: 'FINISHED'
}
// Frontend facing Text of stream/live sessions
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
// Actions pertaining to what happens when user clicks on a notification
export const notificationActionTypes = {
  STREAM: 'STREAM',
  CALL_REQUEST: 'CALL_REQUEST',
  CALL_ACCEPT: 'CALL_ACCEPT',
  AGORA_SESSION: 'AGORA_SESSION'
};

export const foodTypes = {
  BREAKFAST: 'BREAKFAST',
  LUNCH: 'LUNCH',
  DINNER: 'DINNER',
  SNACKS: 'SNACKS'
}
// Shows a badge under user's DP in community tab
// Configured for trainer, more options(like admin) can be added
export const badgeTypes = {
  trainer: {
    display: 'Trainer',
    textColor: 'white',
    backgroundColor: appTheme.brightContent
  }
}
export const subscriptionType = {
  SINGLE: 'SINGLE',// one to one session
  BATCH: 'BATCH', // Group session
}
export const subscriptionTypeNames = {
  SINGLE: 'Workout',
  BATCH: 'Group Workout',
}
export const MS_IN_DAY = 86400000;// (1000 * 60 * 60 * 24)
export const MAX_VIDEO_LENGTH = 120; // 120 seconds, videos bigger than this are not allowed to be uploaded
export const DEFAULT_WATER_INTAKE_QUOTA = 4000; // in ml
export const DEFAULT_CALORIE_INTAKE_QUOTA = 2000; // in cal
export const paymentBackground = "https://about.wodup.com/wp-content/uploads/2018/11/a84f9b3b-a46c-4a3c-9ec9-ba87b216548a-300x300.jpg";
export const MEETING_PRE_START_WINDOW = 600; //10 Mins before scheduled time trainer can start meeting
export const MEETING_POST_START_WINDOW = 1800; //30 Mins after scheduled time trainer can start meeting