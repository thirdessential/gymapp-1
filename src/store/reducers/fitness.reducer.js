import { fitnessState as initialState } from "./initialState";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/utils";
import { getTodayFormattedDate } from "../../utils/utils";
const todaysDate = getTodayFormattedDate();
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
      const oldCalorieData = { ...state.calorieData };
      const { calorieData } = action.payload;
      if (oldCalorieData) {
        if (oldCalorieData[todaysDate]) {
          oldCalorieData[todaysDate] = oldCalorieData[todaysDate].concat(
            calorieData
          );
        } else {
          oldCalorieData[todaysDate] = calorieData;
        }
      } else {
        oldCalorieData[todaysDate] = calorieData;
      }

      return updateObject(state, { calorieData: oldCalorieData });
    }
    case actionTypes.ADD_WATER_INTAKE:
      const { waterIntake } = action.payload;

      const oldWaterIntake = { ...state.waterIntake };
      if (oldWaterIntake) {
        if (oldWaterIntake[todaysDate]) {
          oldWaterIntake[todaysDate] = waterIntake;
        } else {
          oldWaterIntake[todaysDate] = waterIntake;
        }
      } else {
        oldWaterIntake[todaysDate] = waterIntake;
      }

      return updateObject(state, { waterIntake: oldWaterIntake });
    default:
      return state;
  }
};

export default reducer;
