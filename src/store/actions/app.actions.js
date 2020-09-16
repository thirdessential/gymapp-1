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

export const updateUsersList = (page = '') => {
  return async (dispatch) => {
    try {

      let {users, nextPage} = await API.listUsers(page === INITIAL_PAGE ? null : page);
      console.log(users,'-------------------------------')
      if (users) {
        if (page === INITIAL_PAGE)
          await dispatch(setUserList(users)); // initialise list from scratch
        else dispatch(appendUserList(users)); // else append data to list

        dispatch(setUserFromUserList(users));
        const wallPreloadData = [];
        // Extract cover image urls and preload them
        users.map(user => {
          if (!!user.wallImageUrl)
            wallPreloadData.push({uri: user.wallImageUrl});
        });
        FastImage.preload(wallPreloadData);
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

// Set user data for a particular user
export const setUser = (userId) => {
  return async (dispatch) => {
    try {
      let {user} = await API.getUserInfo(userId);
      if (user) {
        await dispatch(setUserAction(user));
      }
    } catch (error) {
      console.log("UserData update failed", error);
    }
  };
};

export const updateScreenCopilots = (copilotScreen) => ({
  type: actionTypes.COPILOT_SCREEN_DONE,
  payload: {
    copilotScreen
  }
})
