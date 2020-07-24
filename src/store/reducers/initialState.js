import {userTypes} from "../../constants/appConstants";

export const authState = {
  authenticated: false,
  newUser: false
};

export const userState = {
  authToken: '',
  userType: userTypes.USER,
  userId: '',
  initialLogin: true,
  userName: '',
  userData: null,
  myAppointments: [],
  activities: {},
};

export const callState = {
  callActive: false,
  inAppCall: false,
  callData: {}
}

export const appState = {
  userList: [], // user listing TODO:Rename this
  users: {},// detailed user info for each user
  globalSlots: null, // globally available slots, and its metadata
}

export const trainerState = {
  packages: [],
  slots: [],
  subscriptions: [],
  coupons: []
}

export const socialState = {
  posts: [],
  postDetails: {},
  myPosts: null,
  postsForUser: {},
  questions: [],
  // questionDetails:{},
}

export const fitnessState = {
  bmiRecords: [],
  preferences: [],
  exerciseIndex: 3,
  targetWeight:null,
  targetDate:null
}