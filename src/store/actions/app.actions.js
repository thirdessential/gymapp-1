import * as actionTypes from "./actionTypes";
import * as API from "../../API";

export const setUserList = (userList) => ({
  type: actionTypes.SET_USER_LIST,
  payload: {
    userList
  },
});

export const updateUsersList = () => {
  return async (dispatch) => {
    try {
      let {trainers} = await API.listUsers();
      if (trainers) {
        dispatch(setUserList(trainers));
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

export const setGlobalSlots  = (globalSlots) => ({
  type: actionTypes.SET_GLOBAL_SLOTS,
  payload: {
    globalSlots
  }
});

export const updateGlobalSlots = () => {
  return async (dispatch) => {
    try {
      let slotData = await API.getGlobalSlots();
      dispatch(setGlobalSlots(slotData));
    } catch (error) {
      console.log("Global slot update failed", error);
    }
  };
};
