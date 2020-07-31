import axios from "./config";
import {validateResponseCode} from "../utils/utils";

export const createPackage = async ({title, noOfSessions, price, description, category}) => {
  try {
    let response = await axios.post(`/package/create`, {
      title,
      noOfSessions,
      price,
      description,
      category
    });
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getPackage = async (packageId) => {
  try {
    let response = await axios.get(`/package/${packageId}`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const updatePackage = async (packageId, {title, noOfSessions, price, description, category}) => {
  try {
    let response = await axios.put(`/package/${packageId}`, {
      title,
      noOfSessions,
      price,
      description,
      category
    });
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const deletePackage = async (packageId) => {
  try {
    let response = await axios.delete(`/package/${packageId}`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const syncSlots = async (slotArray) => {
  try {
    let response = await axios.post(`/slot/createOrUpdate`, slotArray);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// export const getGroupedSlots = async () => {
//   try {
//     let response = await axios.get(`/trainer/mySlots`);
//     if (validateResponseCode(response.status)) {
//       return response.data;
//     } else
//       return false;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

export const getMySubscriptions = async () => {
  try {
    let response = await axios.get(`/user/mySubscriptions`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getMyCoupons = async () => {
  try {
    let response = await axios.get(`/payment/getCoupons`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const generateCoupons = async (count, percentageOff = 5, validity = 3) => {
  try {
    let response = await axios.post(`/payment/generateCoupons`, {
      count,
      percentageOff,
      validity
    });
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getAccountSummary = async () => {
  try {
    let response = await axios.get(`/payment/accountSummary`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const addAccount = async ({ifscCode, accountNumber, holderName, bankName}) => {
  try {
    let response = await axios.post('payment/addAccount', {ifscCode, accountNumber, holderName, bankName});
    if (validateResponseCode(response.status)) {
      console.log("api/trainer/addacc " + response.data);
      console.log("api/trainer/addacc " + error);
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const getMyAccounts = async () => {
  try {
    let response = await axios.get(`/payment/getMyAccounts`);
    if (validateResponseCode(response.status)) {
      console.log("api/trainer" + response.data);
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log("api/trainer" + error);
    return false;
  }
}

export const getCallbacks = async () => {
  try {
    let response = await axios.get(`/callback/myCallbacks`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const acceptCallBack = async (callbackId) => {
  try {
    let response = await axios.put(`/callback/${callbackId}/accept`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const rejectCallBack = async (callbackId) => {
  try {
    let response = await axios.put(`/callback/${callbackId}/reject`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export const callbackDone = async (callbackId) => {
  try {
    let response = await axios.put(`/callback/${callbackId}/done`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}