import * as actionTypes from "./actionTypes";
import {updateAxiosToken} from "../../API";
import {userTypes} from "../../constants/appConstants";
import {signOutFirebase} from "../../API/firebaseMethods";

export const genericUserFieldSetter = (payload) => ({ // TODO: refactor this function into multiple specific setters
  type: actionTypes.GENERIC_USER_FIELD_SET,
  payload
})

export const setUserType = (userType = userTypes.USER) => ({
  type: actionTypes.SET_USER_TYPE,
  payload: {
    userType
  }
})
export const setInitialLoginOff = () => ({
  type: actionTypes.SET_INITIAL_LOGIN_OFF,
  payload: {
    initialLogin: false
  }
})

export const setAuthTokenAction = (authToken) => ({
  type: actionTypes.SET_AUTH_TOKEN,
  payload: {
    authToken
  },
});

export const setAuthToken = (authToken) => {
  return async (dispatch) => {
    dispatch(setAuthTokenAction(authToken));
    updateAxiosToken(authToken);
  };
};

export const resetUser = () => ({
  type: actionTypes.RESET_USER,
});

export const signOutUser =  () => {
  return async (dispatch) => {
    dispatch(resetUser());
    signOutFirebase();
  };
};
