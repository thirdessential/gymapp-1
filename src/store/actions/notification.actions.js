import * as actionTypes from "./actionTypes";
import cuid from "cuid";

// Create a new notification object and add it to front of list
export const addNotification = (text, displayImage = null, type, sentDate, data) => ({
  type: actionTypes.ADD_NOTIFICATION,
  payload: {
    notification: {
      id: cuid(),
      text,
      displayImage,
      read: false,
      type,
      sentDate,
      data,
    }
  },
});

// Mark notification as read
export const readNotification = (id) => ({
  type: actionTypes.READ_NOTIFICATION,
  payload: {
    id
  },
});

// Delete all notifications
export const clearAllNotifications = () => ({
  type: actionTypes.CLEAR_ALL_NOTIFICATIONS,
});
