import * as actionTypes from "./actionTypes";
import * as API from "../../API";

export const setPackages = (packages) => ({
  type: actionTypes.SET_PACKAGES,
  payload: {
    packages
  },
});

// export const getPackages = () => {
//   return async (dispatch, getState) => {
//     try {
//       let result = await API.ge();
//       // if(trainers){
//       //   dispatch(setTrainers(trainers));
//       // }
//     } catch (error) {
//       console.log("Trainer package update failed", error);
//     }
//   };
// };