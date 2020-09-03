import {INITIAL_USER_TYPE, userTypes} from "../../constants/appConstants";

export const authState = {
  authenticated: false,
};

export const userState = {
  authToken: '',
  userType: INITIAL_USER_TYPE,
  userId: '',
  initialLogin: true,
  termsAccepted:false,
  userName: '',
  userData: {},
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
  coupons: [],
  earnings: {totalEarnings: 0, claimableAmount: 0, claimedAmount: 0},
  statements: [],
  accountData:[],
  accounts:[],
  callbacks:[]
}

export const socialState = {
  posts: [],
  postDetails: {},
  myPosts: null,
  postsForUser: {},
  questions: [],
  commentsForPost:{},
  liveStreams:[],
  myLiveStreams:[],
}

export const fitnessState = {
  bmiRecords: [],
  preferences: [],
  exerciseIndex: 3,
  targetWeight: null,
  targetDate: null,
  calorieData:{},
  waterIntake:{},
}

export const notificationState = {
  notifications:[]
}