import {userTypes} from "../../constants/appConstants";

export const authState = {
  authenticated: false
};

export const userState = {
  authToken: '',
  userType: userTypes.USER,
  userId: '',
  initialLogin: true,
  userName: '',
  userData: null
};

export const callState = {
  callActive: false,
  inAppCall: false,
  callData: {}
}

export const appState = {
  userList: [], // user listing TODO:Rename this
  users: {},// detailed user info for each user
  globalSlots: {}, // globally available slots, and its metadata
}

export const trainerState = {
  packages: [],
  slots: [],
  subscriptions:[]
}
