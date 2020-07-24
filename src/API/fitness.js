import axios from "./config";

import {validateResponseCode} from "../utils/utils";

export const recordBmi = async (bmi, weight) => {
  try {
    let response = await axios.post('/fitness/recordBmi', {bmi, weight});
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getBmiHistory = async () => {
  try {
    let response = await axios.get('/fitness/getBmiHistory');
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const updatePreferences = async (preferences) => {
  try {
    let response = await axios.put('/fitness/preferences', {preferences});
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getPreferences = async () => {
  try {
    let response = await axios.get('/fitness/preferences');
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const updateExerciseIndex = async (index) => {
  try {
    let response = await axios.post(`/fitness/preferences/exerciseIndex/${index}`);
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}


export const updateTarget = async (weight,date) => {
  try {
    let response = await axios.post(`/fitness/target`, {weight,date});
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}