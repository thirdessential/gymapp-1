import * as actionTypes from "./actionTypes";
import * as API from "../../API";
import cuid from "cuid";

export const addNotification = (text, displayImage = null, type) => ({
  type: actionTypes.ADD_NOTIFICATION,
  payload: {
    notification: {
      id: cuid(),
      text,
      displayImage,
      seen:false,
      type
    }
  },
});

export const syncNotifications = () => {
  return async (dispatch, getState) => {
    try {

    } catch (error) {
      console.log("sync notification failed", error);
      return false;
    }
  };
};
