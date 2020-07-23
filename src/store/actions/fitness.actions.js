import * as actionTypes from "./actionTypes";
import * as API from "../../API";

export const setBmiRecords = (bmiRecords) => ({
  type: actionTypes.SET_BMI_RECORDS,
  payload: {
    bmiRecords,
  }
});

export const updateBmiRecords = () => {
  return async (dispatch) => {
    try {
      let {success, records} = await API.getBmiHistory();
      if (success)
        dispatch(setBmiRecords(records));
      return success;
    } catch (error) {
      console.log("fetching bmi history failed", error);
      return false;
    }
  };
};

export const submitBmi = (bmi, weight) => {
  return async (dispatch) => {
    try {
      let record = await API.recordBmi(bmi, weight);
      dispatch(updateBmiRecords()); //todo:remove this
      //TODO: add dispatch to store in redux for update
      return !!record.success;
    } catch (error) {
      console.log("submit bmi failed", error);
      return false;
    }
  };
};

export const setPreferences = (preferences) => ({
  type: actionTypes.SET_PREFERENCES,
  payload: {
    preferences,
  }
});

export const setExerciseIndex = (exerciseIndex) => ({
  type: actionTypes.SET_EXERCISE_INDEX,
  payload: {
    exerciseIndex,
  }
});
export const getPreferences = () => {
  return async (dispatch) => {
    try {
      let {preferences, exerciseIndex} = await API.getPreferences();
      dispatch(setPreferences(preferences));
      dispatch(setExerciseIndex(exerciseIndex));
    } catch (error) {
      console.log("preference get failed", error);
      return false;
    }
  };
};
export const updatePreferences = (preferences) => {
  return async (dispatch) => {
    try {
      dispatch(setPreferences(preferences));
      await API.updatePreferences(preferences); // no error handling
    } catch (error) {
      console.log("preference update failed", error);
      return false;
    }
  };
};
export const updateExerciseIndex = (exerciseIndex) => {
  return async (dispatch) => {
    try {
      dispatch(setExerciseIndex(exerciseIndex));
      await API.updateExerciseIndex(exerciseIndex); // no error handling
    } catch (error) {
      console.log("preference update failed", error);
      return false;
    }
  };
};

