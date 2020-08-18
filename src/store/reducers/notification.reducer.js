import {authState as initialState} from './initialState';
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../utils/utils";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTIFICATION:
      const {notification} = action.payload;
      const {notifications} = state;
      notifications[notification._id] = notification;
      return updateObject(state, {notifications});
    default:
      return state;
  }
};

export default reducer;
