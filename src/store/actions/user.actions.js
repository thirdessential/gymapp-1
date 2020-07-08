import * as actionTypes from "./actionTypes";
import {updateAxiosToken} from "../../API";
import {userTypes} from "../../constants/appConstants";
import {signOutFirebase} from "../../API/firebaseMethods";
import * as API from "../../API";
import {setUser, setUserList} from "./app.actions";
import {setPackages, setSlots} from "./trainer.actions";

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

export const setUserName = (userName) => ({
  type: actionTypes.SET_USER_NAME,
  payload: {
    userName
  },
});

export const setUserData = (userData) => ({
  type: actionTypes.SET_USER_DATA,
  payload: {
    userData
  },
});

export const updateUserData = () => {
  return async (dispatch) => {
    try {
      let {user} = await API.getMyInfo();
      if (!user) throw new Error("No user returned");
      dispatch(setUserData(user));
      let {name} = user;
      if (!!name)
        dispatch(setUserName(name));

      if (user.userType === userTypes.TRAINER) {
        const {packages, slots} = user;
        // if(packages)
        dispatch(setPackages(packages));
        dispatch(setSlots(slots));
      }
      return user;

    } catch (error) {
      console.log("User info update failed", error);
      return false;
    }
  };
};

export const subscribePackage = (trainerId, packageId, time, days) => {
  return async (dispatch) => {
    try {
      let result = await API.subscribeToPackage(trainerId, packageId, time, days);
      dispatch(setUser(trainerId));
      return !!result.success;
    } catch (error) {
      console.log("Subscription failed", error);
      return false;
    }
  };
};


export const resetApp = () => ({
  type: actionTypes.RESET_APP,
});


export const signOutUser = () => {
  return async (dispatch) => {
    await signOutFirebase();
    dispatch(resetApp());
  };
};
