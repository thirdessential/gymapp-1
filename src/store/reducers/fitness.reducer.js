import {fitnessState as initialState} from './initialState';
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../utils/utils";

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
    case actionTypes.ADD_CALORIE_DATA:{
      //console.log(action.payload);
      // const {calorieData}=action.payload;
      // console.log(calorieData);
      const oldFoods=[...state.calorieData];
console.log("321");
      console.log(oldFoods);

      console.log("123")
      return updateObject(state, {calorieData:oldFoods.concat(action.payload.calorieData)});
    }
    default:
      return state;
  }
};

export default reducer;
