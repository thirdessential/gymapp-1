import * as actionTypes from "./actionTypes";
import * as API from "../../API";
import FastImage from "react-native-fast-image";

export const setUserList = (userList) => ({
  type: actionTypes.SET_USER_LIST,
  payload: {
    userList
  },
});

export const setUserFromUserList = (userList = null) => ({
  type: actionTypes.SET_USER_FROM_USER_LIST,
  payload: {
    userList
  },
})

export const updateUsersList = () => {
  return async (dispatch) => {
    try {
      let {trainers} = await API.listUsers();
      if (trainers) {
        await dispatch(setUserList(trainers)); // await probably has no effect
        dispatch(setUserFromUserList(trainers));
        const wallPreloadData = [];
        trainers.map(user => {
          if (!!user.wallImageUrl)
            wallPreloadData.push({uri: user.wallImageUrl});
        });
        FastImage.preload(wallPreloadData); //TODO: Check if this actually works?
      }
    } catch (error) {
      console.log("user list update failed", error);
    }
  };
};

export const setUserAction = (user) => ({
  type: actionTypes.SET_USER,
  payload: {
    user
  }
});

export const setUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let {user} = await API.getUserInfo(userId);
      if (user) {
        dispatch(setUserAction(user));
      }
    } catch (error) {
      console.log("UserData update failed", error);
    }
  };
};

export const setGlobalSlots = (globalSlots) => ({
  type: actionTypes.SET_GLOBAL_SLOTS,
  payload: {
    globalSlots
  }
});

export const updateGlobalSlots = () => {
  return async (dispatch) => {
    try {
      let {availableSlots} = await API.getGlobalSlots();
      dispatch(setGlobalSlots(availableSlots));
    } catch (error) {
      console.log("Global slot update failed", error);
    }
  };
};
