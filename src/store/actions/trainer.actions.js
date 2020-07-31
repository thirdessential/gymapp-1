import * as actionTypes from "./actionTypes";
import * as API from "../../API";
import {set, sub} from "react-native-reanimated";
import {callbackStatus} from "../../constants/appConstants";

export const setPackages = (packages) => ({
  type: actionTypes.SET_PACKAGES,
  payload: {
    packages
  },
});

export const updatePackage = (packageData) => ({
  type: actionTypes.UPDATE_PACKAGE,
  payload: {
    packageData
  },
});

export const createPackage = (packageData) => {
  return async (dispatch, getState) => {
    try {
      const {title, noOfSessions, price, description, _id, category} = packageData;
      let result = null;
      if (_id) {
        dispatch(updatePackage(packageData)); //optimistic TODO:rollback
        result = await API.updatePackage(_id, {title, noOfSessions, description, price, category});
        console.log("package updated", result);
      } else {
        result = await API.createPackage({title, noOfSessions, description, price, category});
        console.log("package created", result);
        const packageData = result.package;
        dispatch(updatePackage(packageData));
      }
      return result;
    } catch (error) {
      console.log("Trainer package creation failed", error);
      return false;
    }
  };
};

export const removePackage = (packageId) => ({
  type: actionTypes.REMOVE_PACKAGE,
  payload: {
    packageId
  },
});

export const deletePackage = (packageId) => {
  return async (dispatch) => {
    try {
      dispatch(removePackage(packageId));
      let result = await API.deletePackage(packageId);
      if (result && result.success) {
        console.log('package deleted', result);
        return true;
      } else {
        //TODO:rollback
        return false;
      }
    } catch (error) {
      console.log("Trainer package deletion failed", error);
      return false;
    }
  };
};

export const setSlots = (slots) => ({
  type: actionTypes.SET_SLOTS,
  payload: {
    slots
  },
});

export const createSlots = (slotArray) => {

  return async (dispatch, getState) => {
    let oldSlots = getState().trainer.slots;
    try {
      // dispatch(setSlots(slotArray));
      let slots = await API.syncSlots(slotArray);
      if (slots) {
        console.log('slots created', slots.length);
        dispatch(setSlots(slots));
        return true;
      } else {
        //TODO: finish this rollback by showing error
        console.log("Trainer slot creation failed", slots);
        dispatch(setSlots(oldSlots));
        return false;
      }
    } catch (error) {
      console.log("Trainer slot creation failed", error);
      dispatch(setSlots(oldSlots));
      return false;
    }
  };
};

export const setSubscriptions = (subscriptions) => ({
  type: actionTypes.SET_MY_SUBSCRIPTIONS,
  payload: {
    subscriptions
  },
});


export const syncSubscriptions = () => {
  return async (dispatch) => {
    try {
      let subscriptions = await API.getMySubscriptions();
      dispatch(setSubscriptions(subscriptions));
    } catch (error) {
      console.log("Trainer subs update failed", error);
      return false;
    }
  };
};

const setCoupons = (coupons) => ({
  type: actionTypes.SET_COUPONS,
  payload: {
    coupons
  },
});
const appendCoupons = (coupons) => ({
  type: actionTypes.APPEND_COUPONS,
  payload: {
    coupons
  },
});

export const generateCoupons = (count, percentageOff, validity) => {
  return async (dispatch, getState) => {
    try {
      let oldCoupons = [...getState().trainer.coupons];
      let {success, coupons} = await API.generateCoupons(count, percentageOff, validity);
      if (success)
        dispatch(appendCoupons(coupons));
      else dispatch(setCoupons(oldCoupons));
    } catch (error) {
      console.log("Trainer coupon creation failed", error);
      return false;
    }
  };
};
export const syncCoupons = () => {
  return async (dispatch) => {
    try {
      const {coupons} = await API.getMyCoupons();
      dispatch(setCoupons(coupons));
      return true;
    } catch (error) {
      console.log("Trainer coupon creation failed", error);
      return false;
    }
  };
};

const setEarnings = (earnings) => ({
  type: actionTypes.SET_EARNINGS,
  payload: {
    earnings
  },
});

const setStatements = (statements) => ({
  type: actionTypes.SET_STATEMENTS,
  payload: {
    statements
  },
});

export const getAccountSummary = () => {
  return async (dispatch) => {
    try {
      const {earnings, statements} = await API.getAccountSummary();
      earnings && dispatch(setEarnings(earnings));
      statements && dispatch(setStatements(statements));
      return true;
    } catch (error) {
      console.log("Trainer acc summary update failed", error);
      return false;
    }
  };
};
export const createAccount = (accountData) => ({
  type: actionTypes.ADD_ACCOUNT,
  payload: {
    accountData
  },
});
export const addAccount=(accountDetails) => {
  return async (dispatch)=>{
    try {
      const {ifscCode,accountNumber,holderName,bankName}=accountDetails;
      result=await API.addAccount({ifscCode,accountNumber,holderName,bankName});
      const accountData=result.account;
      dispatch(createAccount(accountData));
      console.log(result)
    } catch (error) {
      console.log("aacount creation failed in trainer.actions.js", error);
      return false;
    }
  }
  }
  export const getAccounts = (accounts) => ({
    type: actionTypes.GET_MY_ACCOUNTS,
    payload: {
      accounts
    },
  });
  export const getMyAccounts=()=>{
    return async (dispatch) => {
      try {
  result = await API.getMyAccounts();
  const accounts=result.accounts;
  dispatch(getAccounts(accounts));
  console.log(result);
      }catch (error) {
        console.log("aacount creation failed in trainer.actions.js", error);
        return false;
      }
    }
  }

const setCallbacks = (callbacks) => ({
  type: actionTypes.SET_CALLBACKS,
  payload: {
    callbacks
  },
});
const setCallbackStatus = (callbackId, status) => ({
  type: actionTypes.SET_CALLBACK_STATUS,
  payload: {
    callbackId,
    status
  },
});
const removeCallback = (callbackId) => ({
  type: actionTypes.REMOVE_CALLBACK,
  payload: {
    callbackId
  },
});

export const getCallbacks = () => {
  return async (dispatch) => {
    try {
      const {success, callbacks} = await API.getCallbacks();
      if(success)
        dispatch(setCallbacks(callbacks));
      return true;
    } catch (error) {
      console.log("Trainer list callback failed", error);
      return false;
    }
  };
};

export const acceptCallback = (callbackId) => {
  return async (dispatch) => {
    try {
      dispatch(setCallbackStatus(callbackId,callbackStatus.ACCEPTED));
      const {success} = await API.acceptCallBack(callbackId);
      if(!success){
        //todo handle it here
        throw new Error("Accept callback failed")
      }
      return true;
    } catch (error) {
      console.log("Trainer Accept callback failed", error);
      return false;
    }
  };
};
export const rejectCallback = (callbackId) => {
  return async (dispatch) => {
    try {
      dispatch(removeCallback(callbackId));
      const {success} = await API.rejectCallBack(callbackId);
      if(!success){
        //todo handle it here
        throw new Error("reject callback failed")
      }
      return true;
    } catch (error) {
      console.log("Trainer reject callback failed", error);
      return false;
    }
  };
};
export const callbackDone = (callbackId) => {
  return async (dispatch) => {
    try {
      dispatch(removeCallback(callbackId));
      const {success} = await API.callbackDone(callbackId);
      if(!success){
        //todo handle it here
        throw new Error("done callback failed")
      }
      return true;
    } catch (error) {
      console.log("Trainer done callback failed", error);
      return false;
    }
  };
};