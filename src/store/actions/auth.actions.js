import * as actionTypes from "./actionTypes";
import * as API from "../../API";
import {setAuthToken, genericUserFieldSetter, setUserData} from './user.actions';
import {userTypes} from "../../constants/appConstants";

export const setAuthenticated = (authenticated) => ({
  type: actionTypes.SET_AUTHENTICATED,
  payload: {
    authenticated
  },
});

export const syncFirebaseAuth = (idToken, fcmToken) => {
  return async (dispatch, getState) => {
    try {
      const userType = getState().user.userType;
      let result = await API.firebaseGoogleAuth(idToken, fcmToken, userType);
      if (result) {
        const {userId, authToken, userType, userData, isNewUser} = result;
        await dispatch(setAuthToken(authToken));
        await dispatch(genericUserFieldSetter({
          userId,
          userType,
          initialLogin: isNewUser // go to initialLogin only if newUser
        }));
        await dispatch(setUserData(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.log("Google auth failed", error);
      return false;
    }
  };
};
