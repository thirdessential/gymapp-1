import * as actionTypes from "./actionTypes";
import * as API from "../../API";
import FastImage from "react-native-fast-image";
import {INITIAL_PAGE} from "../../constants/appConstants";

export const setUserList = (userList) => ({
  type: actionTypes.SET_USER_LIST,
  payload: {
    userList
  },
});
export const appendUserList = (userList) => ({
  type: actionTypes.APPEND_USER_LIST,
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

export const updateUsersList = (page='') => {
  return async (dispatch) => {
    try {

      let {users, nextPage} = await API.listUsers(page===INITIAL_PAGE?null:page);
      if (users) {
        if(page===INITIAL_PAGE)
          await dispatch(setUserList(users)); // initialise list from scratch
        else dispatch(appendUserList(users)); // else append data to list
        dispatch(setUserFromUserList(users));
        const wallPreloadData = [];
        users.map(user => {
          if (!!user.wallImageUrl)
            wallPreloadData.push({uri: user.wallImageUrl});
        });
        FastImage.preload(wallPreloadData); //TODO: Check if this actually works?
        return nextPage;
      }
    } catch (error) {
      console.log("user list update failed", error);
      return null;
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
  return async (dispatch) => {
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
