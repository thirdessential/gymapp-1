import * as actionTypes from "./actionTypes";
import * as API from "../../API";

export const addNotification = (id, text, displayPicture = null) => ({
  type: actionTypes.ADD_NOTIFICATION,
  payload: {
    notification: {
      id, text, displayPicture
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
