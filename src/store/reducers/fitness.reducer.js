import { fitnessState as initialState } from "./initialState";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/utils";

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
      var date = new Date().toLocaleDateString();
      const oldCalorieData = { ...state.calorieData };
      const { calorieData } = action.payload;
      if (oldCalorieData) {
        if (oldCalorieData[date]) {
          oldCalorieData[date] = oldCalorieData[date].concat(calorieData);
        } else {
          oldCalorieData[date] = calorieData;
        }
      } else {
        oldCalorieData[date] = calorieData;
      }
      console.log(calorieData);
      console.log(oldCalorieData);
      return updateObject(state, {calorieData:oldCalorieData});
      //
    }
    default:
      return state;
  }
};

export default reducer;
