import axios, {validateResponseCode} from "./config";

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
};

export const getRecommendation = async () => {
  try {
    let response = await axios.get('/recommend');
    if (validateResponseCode(response.status)) {
      return response.data;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const updateMealIntake = async (date, foodItems) => {
  try {
    let response = await axios.post('/caloriesIntake/save', {date, foodItems});
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log("error in fitness mealintake");
    console.log(error);
    return false
  }
}
export const searchFood = async (name, qty) => {
  try {
    let response = await axios.post('/foodItems/getByName', {name , qty});
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log("error in fitness.js app");
    return false;
  }
}

export const waterIntake = async (date, quantity) => {
  try {
    let response = await axios.post('/waterIntake', {date, quantity});
    if (validateResponseCode(response.status)) {
      return response.data;
    } else {
      console.log("else mei atka");
      return false;
    }
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


export const updateTarget = async (weight, date) => {
  try {
    let response = await axios.post(`/fitness/target`, {weight, date});
    if (validateResponseCode(response.status))
      return response.data;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}