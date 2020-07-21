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