import {notificationState as initialState} from './initialState';
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../utils/utils";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTIFICATION:
      const {notification} = action.payload;
      const notifications = [...state.notifications];
      notifications.unshift(notification); // Add notification to front of list
      return updateObject(state, {notifications: notifications.slice(0, 50)}); // Keep only last 50 notifications
    case actionTypes.READ_NOTIFICATION: {
      // Mark notification as read
      const {id} = action.payload;
      const notifications = state.notifications.map(notification => {
        if (notification.id === id)
          notification.read = true;
        return notification;
      });
      return updateObject(state, {notifications})
    }
    case actionTypes.CLEAR_ALL_NOTIFICATIONS:
      // Delete all notifications
      return initialState;
    default:
      return state;
  }
};

export default reducer;
