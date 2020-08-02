import axios from './config';
import {validateResponseCode} from "../utils/utils";

export const updateAxiosToken = (token) => {
  if (!token) {
    console.log("Clearing axios token", token);
    axios.defaults.headers.common['Authorization'] = '';
  } else {
    console.log("updating axios token", token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
};

export const firebaseGoogleAuth = async (idToken, fcmToken, userType) => {
  try {
    let response = await axios.post('/register/googleAuth', {
      idToken,
      fcmToken,
      userType
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