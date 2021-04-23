import {INITIAL_USER_TYPE} from "../../constants/appConstants";

export const authState = {
  authenticated: false,
};

export const userState = {
  authToken: '', // Axios token, which is set on app start
  userType: INITIAL_USER_TYPE, // Indicates what type of apk is being distributed
  userId: '', // userId of the account logged in
  initialLogin: true, // Indicates whether this is a new account, and asks users to input user data if yes
  termsAccepted: false, // Did the user accept terms n conditions yet? If no, block further entry in app
  userName: '',
  userData: {}, // stores a copy of userData model from backend. Contains all user attributes
};

export const callState = {
  callActive: false, // Is any call currently active
  inAppCall: false, // Was the call initiated from the application?
  callData: {}, // sessionId, appId etc fields related to active call
}

export const appState = {
  userList: [], // List of users, shown in listing page ( Now only trainers are listed)
  users: {},// detailed user info for each user
  copilotScreen: {} // Marks which screens have completed their copilot tutorial
}

export const trainerState = {
  packages: [], //  List of my packages
  slots: [], // List of my Slots
  subscriptions: [], // List of my clients/subscribers. This property is common for both user and trainer
  coupons: [], // List of my coupons
  earnings: {totalEarnings: 0, claimableAmount: 0, claimedAmount: 0},
  statements: [], // Subscription payment statements
  accountData: [],
  accounts: [],// Linked bank accounts
  callbacks: [], // Requested callbacks for this trainer
  sessions: []// also applies to users
}

export const socialState = {
  posts: [], // Store list of ids of posts
  postDetails: {}, // Object with keys at post/question ids and values as their data
  myPosts: null, // list of ids of my posts
  postsForUser: {}, // Object with keys as userId and values as array of their posts
  questions: [], // list of ids of questions(their data is stored in postDetails)
  commentsForPost: {}, // keys are post ids and values are array of comments
  liveStreams: [], // List of all live streams
  myLiveStreams: [], // List of my live streams
  youtubeVideos:[]
}

export const fitnessState = {
  bmiRecords: [],
  preferences: [],
  exerciseIndex: 3,
  targetWeight: null,
  targetDate: null,
  calorieData: {},
  waterIntake: {},
}

export const notificationState = {
  notifications: [] // List of notifications that shows up in bell icon on header right
}