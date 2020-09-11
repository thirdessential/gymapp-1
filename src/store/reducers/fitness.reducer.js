import {fitnessState as initialState} from "./initialState";
import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../utils/utils";
import {getFormattedDate} from "../../utils/utils";

const today = getFormattedDate();

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BMI_RECORDS:
      return updateObject(state, action.payload);
    case actionTypes.SET_PREFERENCES:
      return updateObject(state, action.payload);
    case actionTypes.SET_EXERCISE_INDEX:
      return updateObject(state, action.payload);
    case actionTypes.SET_TARGET:
      return updateObject(state, action.payload);
    case actionTypes.ADD_CALORIE_DATA: {
      // calorieData is an object with keys as date and values as array of calorie data objects
      const oldCalorieData = {...state.calorieData};
      const {calorieData} = action.payload;
      if (oldCalorieData) {
        if (oldCalorieData[today])
          oldCalorieData[today] = oldCalorieData[today].concat(calorieData);
        else
          oldCalorieData[today] = calorieData;
      } else
        oldCalorieData[today] = calorieData;
      return updateObject(state, {calorieData: oldCalorieData});
    }
    case actionTypes.ADD_WATER_INTAKE:
      // waterIntake is object with keys as date and values as water intake on that date(in ml)
      const {waterIntake} = action.payload;
      const oldWaterIntake = {...state.waterIntake};
      oldWaterIntake[today] = waterIntake;
      return updateObject(state, {waterIntake: oldWaterIntake});
    default:
      return state;
  }
};

export default reducer;
