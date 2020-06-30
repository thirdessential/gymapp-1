import * as actionTypes from "./actionTypes";
import * as API from "../../API";

export const setPackages = (packages) => ({
  type: actionTypes.SET_PACKAGES,
  payload: {
    packages
  },
});

export const updatePackage = (packageData) => ({
  type: actionTypes.UPDATE_PACKAGE,
  payload: {
    packageData
  },
});

export const createPackage = ({title, noOfSessions, price, description, _id}) => {
  return async (dispatch, getState) => {
    try {
      let result = null;
      if (_id) {
        result = await API.updatePackage(_id, {title, noOfSessions, description, price});
        console.log("package updated", result);
      } else {
        result = await API.createPackage({title, noOfSessions, description, price});
        console.log("package created", result);
      }
      const packageData = result.package;
      dispatch(updatePackage(packageData));
      return result;

    } catch (error) {
      console.log("Trainer package creation failed", error);
      return false;
    }
  };
};

export const deletePackage = (packageId) => {
  return async (dispatch, getState) => {
    try {
      let result = await API.deletePackage(packageId);

      console.log('package deleted', result);


    } catch (error) {
      console.log("Trainer package creation failed", error);
      return false;
    }
  };
};