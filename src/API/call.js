import axios from './config';
import {validateResponseCode} from "../utils/utils";

export const makeCall = async (userId) => {
  try {
    let response = await axios.post(`/call/`,{
      targetUserId:userId
    });
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const setBusy = async () => {
  try {
    await axios.get(`/call/active`);
  } catch (error) {
    console.log(error);
  }
}

export const setAvailable = async () => {
  try {
    await axios.get(`/call/inactive`);
  } catch (error) {
    console.log(error);
  }
}
