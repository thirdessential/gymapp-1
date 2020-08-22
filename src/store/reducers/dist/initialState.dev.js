"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notificationState = exports.fitnessState = exports.socialState = exports.trainerState = exports.appState = exports.callState = exports.userState = exports.authState = void 0;

var _appConstants = require("../../constants/appConstants");

var authState = {
  authenticated: false
};
exports.authState = authState;
var userState = {
  authToken: '',
  userType: _appConstants.INITIAL_USER_TYPE,
  userId: '',
  initialLogin: true,
  userName: '',
  userData: {},
  activities: {}
};
exports.userState = userState;
var callState = {
  callActive: false,
  inAppCall: false,
  callData: {}
};
exports.callState = callState;
var appState = {
  userList: [],
  // user listing TODO:Rename this
  users: {},
  // detailed user info for each user
  globalSlots: null // globally available slots, and its metadata

};
exports.appState = appState;
var trainerState = {
  packages: [],
  slots: [],
  subscriptions: [],
  coupons: [],
  earnings: {
    totalEarnings: 0,
    claimableAmount: 0,
    claimedAmount: 0
  },
  statements: [],
  accountData: [],
  accounts: [],
  callbacks: []
};
exports.trainerState = trainerState;
var socialState = {
  posts: [],
  postDetails: {},
  myPosts: null,
  postsForUser: {},
  questions: [],
  commentsForPost: {},
  liveStreams: [],
  myLiveStreams: []
};
exports.socialState = socialState;
var fitnessState = {
  bmiRecords: [],
  preferences: [],
  exerciseIndex: 3,
  targetWeight: null,
  targetDate: null,
  calorieData: []
};
exports.fitnessState = fitnessState;
var notificationState = {
  notifications: []
};
exports.notificationState = notificationState;