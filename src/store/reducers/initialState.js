import {userTypes} from "../../constants/appConstants";

export const authState = {
  authenticated: false
};

export const userState = {
  authToken: '',
  userType: userTypes.USER,
  userId: '',
  initialLogin: true,
  userName:'',
};

export const callState = {
  callActive: false,
  inAppCall:false,
  callData: {}
}

export const appState = {
  trainers: [], // trainer listing
  users: { // detailed user info
  },
}

export const trainerState = {
  packages:[],
  slots:[]
}
