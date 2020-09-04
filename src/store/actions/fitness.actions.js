import * as actionTypes from "./actionTypes";
import * as API from "../../API";
import moment from 'moment';
import { day } from "javascript-time-ago/gradation";
export const setBmiRecords = (bmiRecords) => ({
  type: actionTypes.SET_BMI_RECORDS,
  payload: {
    bmiRecords,
  },
});

export const updateBmiRecords = () => {
  return async (dispatch) => {
    try {
      let { success, records } = await API.getBmiHistory();
      if (success) dispatch(setBmiRecords(records));
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
  },
});

export const setExerciseIndex = (exerciseIndex) => ({
  type: actionTypes.SET_EXERCISE_INDEX,
  payload: {
    exerciseIndex,
  },
});
const setTarget = (targetWeight, targetDate) => ({
  type: actionTypes.SET_TARGET,
  payload: {
    targetWeight,
    targetDate,
  },
});
export const getPreferences = () => {
  return async (dispatch) => {
    try {
      let { preferences, exerciseIndex } = await API.getPreferences();
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
export const updateTarget = (weight, date) => {
  return async (dispatch) => {
    try {
      dispatch(setTarget(weight, date));
      await API.updateTarget(weight, date); // no error handling
    } catch (error) {
      console.log("target update failed", error);
      return false;
    }
  };
};

export const addFoods = (calorieData) => {
  return {
    type: actionTypes.ADD_CALORIE_DATA,
    payload: {
      calorieData,
    },
  };
};

export const addCalorieData = (calorieData) => {
  return async (dispatch) => {
    try {
      dispatch(addFoods(calorieData));
    } catch (error) {
      console.log("food update failed ", error);
      return false;
    }
  };
};

export const updateWater = (waterIntake) => {
  return {
    type: actionTypes.ADD_WATER_INTAKE,
    payload: {
      waterIntake,
    },
  };
};

export const addWaterIntake = (waterIntake) => {
  //to add water Intake of today
  return async (dispatch) => {
    try {
      dispatch(updateWater(waterIntake));
    } catch (error) {
      console.error("unable to update water info", error);
      return false;
    }
  };
};

export const getWaterIntake=()=>{
  return async (dispatch, getState) => {
  try {
    let waterIntake={...getState().fitness.waterIntake};//get waterIntake objects
   //to sort dates 
let datesArray=Object.keys(waterIntake).sort(function(a, b){//sort according to dates
  var aa = a.split('-').reverse().join(),
      bb = b.split('-').reverse().join();
  return aa < bb ? -1 : (aa > bb ? 1 : 0);
});

let intakeArray=[];
//make array with corresponding values 
await datesArray.forEach(date=>{
  intakeArray.push(waterIntake[date]);
});
//splitdate to send to frontend
let splitDates=await datesArray.map(date=>{
  let splitted=date.split('-');
  let result=splitted[0]+"/"+splitted[1];
  return result
});

//we need to send array of objects to frontend
let dateAndIntake=[];
for(i=0;i<splitDates.length;i++){
  let obj={
    date:splitDates[i],
    intake:intakeArray[i]
  };
 dateAndIntake.push(obj);
};


    return dateAndIntake;

  } catch (error) {
    console.log("error in get water");
    console.log(error);
    return false;
  }
}
}