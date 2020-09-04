import {trainerState as initialState} from './initialState';
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../utils/utils";


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PACKAGES:
      return updateObject(state, action.payload);
    case actionTypes.UPDATE_PACKAGE: {
      const {packageData} = action.payload;
      let packages = [...state.packages];
      let filteredPackages = packages.filter(packageObj => packageObj._id === packageData._id);
      if (filteredPackages.length === 0) {
        packages.push(packageData); // does not exist, add it
      } else {
        packages = packages.map(packageObj => packageObj._id === packageData._id ? packageData : packageObj); //update the package
      }
      return updateObject(state, {packages});
    }
    case actionTypes.REMOVE_PACKAGE: {
      const {packageId} = action.payload;
      let packages = [...state.packages];
      let filteredPackages = packages.filter(packageObj => packageObj._id !== packageId);
      return updateObject(state, {packages: filteredPackages});
    }
    case actionTypes.SET_SLOTS:
      return updateObject(state, action.payload);
    case actionTypes.SET_MY_SUBSCRIPTIONS:
      return updateObject(state, action.payload);
    case actionTypes.SET_MY_SESSIONS:
      return updateObject(state, action.payload);
    case actionTypes.SET_COUPONS:
      return updateObject(state, action.payload);
    case actionTypes.APPEND_COUPONS:
      const oldCoupons = [...state.coupons];
      const {coupons} = action.payload;
      return updateObject(state, {
        coupons: oldCoupons.concat(coupons)
      });
    case actionTypes.SET_EARNINGS:
      return updateObject(state, action.payload);
    case actionTypes.SET_STATEMENTS:
      return updateObject(state, action.payload);
    case actionTypes.ADD_ACCOUNT:
      return updateObject(state, action.payload);
    case actionTypes.GET_MY_ACCOUNTS:
      return updateObject(state, action.payload);
    case actionTypes.SET_CALLBACKS:
      return updateObject(state, action.payload);
    case actionTypes.SET_CALLBACK_STATUS: {
      const {callbackId, status} = action.payload;
      let callbacks = [...state.callbacks];
      callbacks = callbacks.map(callback => {
        if (callback._id === callbackId) {
          callback.status = status;
        }
        return callback;
      })
      return updateObject(state, {callbacks});
    }
    case actionTypes.REMOVE_CALLBACK:
      const {callbackId} = action.payload;
      let callbacks = [...state.callbacks];
      callbacks = callbacks.filter(callback => callback._id !== callbackId);
      return updateObject(state, {callbacks});
    default:
      return state;
  }
};

export default reducer;
