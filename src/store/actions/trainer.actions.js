import * as actionTypes from "./actionTypes";
import * as API from "../../API";
import {set, sub} from "react-native-reanimated";
import {callbackStatus} from "../../constants/appConstants";
import {showError} from "../../utils/notification";
import strings from "../../constants/strings";

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
      const {title, noOfSessions, price, description, _id, category, group, maxParticipants, slot, startDate, active} = packageData;
      let result = null;
      // If _id exists, the package already exists, call the update method; else call the create method
      if (_id) {
        dispatch(updatePackage(packageData));
        result = await API.updatePackage(_id, {
          title,
          noOfSessions,
          description,
          price,
          category,
          group,
          maxParticipants,
          slot,
          startDate,
          active
        });
        console.log("package updated", result);
      } else {
        result = await API.createPackage({
          title,
          noOfSessions,
          description,
          price,
          category,
          group,
          maxParticipants,
          slot,
          startDate
        });
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

// Take the entire state of frontend and pass to backend
// Backend figures out the slots to keep, delete and create
export const createSlots = (slotArray) => {
  return async (dispatch, getState) => {
    let oldSlots = getState().trainer.slots;
    try {
      // dispatch(setSlots(slotArray));
      let slots = await API.syncSlots(slotArray);
      if (slots) {
        console.log(slots.length, ' slots created');
        dispatch(setSlots(slots));
        return true;
      } else {
        throw new Error('Slot creation failed')
      }
    } catch (error) {
      showError(strings.SLOT_CREATION_FAILED);
      console.log("Slot creation failed", error);
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
      let {subscriptions} = await API.getMySubscriptions();
      dispatch(setSubscriptions(subscriptions));
    } catch (error) {
      console.log("Trainer subscription update failed", error);
      return false;
    }
  };
};

const setSessions = (sessions) => ({
  type: actionTypes.SET_MY_SESSIONS,
  payload: {
    sessions
  },
});

export const syncSessions = () => {
  return async (dispatch) => {
    try {
      let {sessions} = await API.getMySessions();
      dispatch(setSessions(sessions));
    } catch (error) {
      console.log("session update failed", error);
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
      else dispatch(setCoupons(oldCoupons)); // TODO: Check if this line is really needed
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
      const {earnings, statements = []} = await API.getAccountSummary();
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
export const addAccount = (accountDetails) => {
  return async (dispatch) => {
    try {
      const {ifscCode, accountNumber, holderName, bankName} = accountDetails;
      const result = await API.addAccount({ifscCode, accountNumber, holderName, bankName});
      const accountData = result.account;
      dispatch(createAccount(accountData));
    } catch (error) {
      console.log("Account creation failed", error);
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
export const getMyAccounts = () => {
  return async (dispatch) => {
    try {
      const result = await API.getMyAccounts();
      const accounts = result.accounts;
      dispatch(getAccounts(accounts));
    } catch (error) {
      console.log("Failed to get accounts", error);
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
      if (success)
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
      dispatch(setCallbackStatus(callbackId, callbackStatus.ACCEPTED));
      const {success} = await API.acceptCallBack(callbackId);
      if (!success) {
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
      if (!success) {
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
      if (!success) {
        throw new Error("done callback failed")
      }
      return true;
    } catch (error) {
      console.log("Trainer done callback failed", error);
      return false;
    }
  };
};

export const scheduleStream = (streamData, instantLive = false) => {
  return async (dispatch) => {
    try {
      const {success, stream} = await API.scheduleStream(streamData);
      if (!success) {
        throw new Error("live stream schedule failed")
      }
      return stream;
    } catch (error) {
      console.log("live stream schedule failed", error);
      return false;
    }
  };
};

export const startSession = (sessionId) => {
  return async (dispatch) => {
    try {
      const {success, data, token} = await API.startSession(sessionId);
      if (!success) {
        throw new Error("session start failed");
      }
      return {data, token};
    } catch (error) {
      console.log("session start failed", error);
      return false;
    }
  };
};

export const joinSession = (sessionId) => {
  return async (dispatch) => {
    try {
      const {success, data} = await API.joinSession(sessionId);
      if (!success) {
        throw new Error("session join failed");
      }
      return {data};
    } catch (error) {
      console.log("session join failed", error);
      return false;
    }
  };
};
