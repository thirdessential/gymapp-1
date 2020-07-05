import axios from "./config";
import {validateResponseCode} from "../utils/utils";

export const listUsers = async () => {
  try {
    let response = await axios.get('/users');
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const updateUserInfo = async (name, bio) => {

  try {
    let response = await axios.put('/user', {
      name,
      bio
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

export const getMyInfo = async () => {
  try {
    let response = await axios.get(`/user`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getUserInfo = async (userId) => {
  try {
    let response = await axios.get(`/user/${userId}`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getGlobalSlots = async () => {
  try {
    let response = await axios.get(`/slot/getAllAvailable`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const subscribeToPackage = async (trainerId, packageId, time, days) => {
  try {
    let response = await axios.post(`/subscription/${trainerId}/${packageId}`, {
      time,
      days
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

export const bookAppointment = async (trainerId, day, time) => {
  try {
    let response = await axios.post(`/appointment/${trainerId}/book`, {
      time,
      day
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