import axios, {validateResponseCode} from './config';

// Takes a target userId and instructs backend to make an instant call
export const makeCall = async (userId) => {
  try {
    let response = await axios.post(`/call/`, {
      targetUserId: userId
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

// Called when user is on an Agora Call, sets flag in backend
export const setBusy = async () => {
  try {
    await axios.get(`/call/active`);
  } catch (error) {
    console.log(error);
  }
}

// Called when user is available, sets flag in backend
export const setAvailable = async () => {
  try {
    await axios.get(`/call/inactive`);
  } catch (error) {
    console.log(error);
  }
}
