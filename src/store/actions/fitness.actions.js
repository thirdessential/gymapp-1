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
