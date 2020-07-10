import * as actionTypes from "./actionTypes";
import * as API from "../../API";
import {setAuthToken, genericUserFieldSetter} from './user.actions';
import {userTypes} from "../../constants/appConstants";

export const setAuthenticated = (authenticated) => ({
  type: actionTypes.SET_AUTHENTICATED,
  payload: {
    authenticated
  },
});

export const setNewUser = (value) => ({
  type: actionTypes.SET_NEW_USER,
  payload: {
    newUser:value
  },
});

export const syncFirebaseAuth = (idToken, fcmToken) => {
  return async (dispatch) => {
    try {
      let result = await API.firebaseGoogleAuth(idToken, fcmToken);
      if (result) {
        if (result.newUser) {
          dispatch(setNewUser(true));
          return true;
        } else {
          const {userId, authToken, userType} = result;
          await dispatch(setAuthToken(authToken));
          await dispatch(genericUserFieldSetter({
            userId,
            userType
          }));
          dispatch(setNewUser(false));
          return true;
        }

      }
      return false;
    } catch (error) {
      console.log("Google auth failed", error);
      return false;
    }
  };
};

export const resetAuth = () => ({
  type: actionTypes.RESET_AUTH,
});