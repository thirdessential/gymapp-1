"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCalorieData = exports.addFoods = exports.updateTarget = exports.updateExerciseIndex = exports.updatePreferences = exports.getPreferences = exports.setExerciseIndex = exports.setPreferences = exports.submitBmi = exports.updateBmiRecords = exports.setBmiRecords = void 0;

var actionTypes = _interopRequireWildcard(require("./actionTypes"));

var API = _interopRequireWildcard(require("../../API"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var setBmiRecords = function setBmiRecords(bmiRecords) {
  return {
    type: actionTypes.SET_BMI_RECORDS,
    payload: {
      bmiRecords: bmiRecords
    }
  };
};

exports.setBmiRecords = setBmiRecords;

var updateBmiRecords = function updateBmiRecords() {
  return function _callee(dispatch) {
    var _ref, success, records;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(API.getBmiHistory());

          case 3:
            _ref = _context.sent;
            success = _ref.success;
            records = _ref.records;
            if (success) dispatch(setBmiRecords(records));
            return _context.abrupt("return", success);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.log("fetching bmi history failed", _context.t0);
            return _context.abrupt("return", false);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 10]]);
  };
};

exports.updateBmiRecords = updateBmiRecords;

var submitBmi = function submitBmi(bmi, weight) {
  return function _callee2(dispatch) {
    var record;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(API.recordBmi(bmi, weight));

          case 3:
            record = _context2.sent;
            dispatch(updateBmiRecords()); //todo:remove this
            //TODO: add dispatch to store in redux for update

            return _context2.abrupt("return", !!record.success);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log("submit bmi failed", _context2.t0);
            return _context2.abrupt("return", false);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.submitBmi = submitBmi;

var setPreferences = function setPreferences(preferences) {
  return {
    type: actionTypes.SET_PREFERENCES,
    payload: {
      preferences: preferences
    }
  };
};

exports.setPreferences = setPreferences;

var setExerciseIndex = function setExerciseIndex(exerciseIndex) {
  return {
    type: actionTypes.SET_EXERCISE_INDEX,
    payload: {
      exerciseIndex: exerciseIndex
    }
  };
};

exports.setExerciseIndex = setExerciseIndex;

var setTarget = function setTarget(targetWeight, targetDate) {
  return {
    type: actionTypes.SET_TARGET,
    payload: {
      targetWeight: targetWeight,
      targetDate: targetDate
    }
  };
};

var getPreferences = function getPreferences() {
  return function _callee3(dispatch) {
    var _ref2, preferences, exerciseIndex;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(API.getPreferences());

          case 3:
            _ref2 = _context3.sent;
            preferences = _ref2.preferences;
            exerciseIndex = _ref2.exerciseIndex;
            dispatch(setPreferences(preferences));
            dispatch(setExerciseIndex(exerciseIndex));
            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            console.log("preference get failed", _context3.t0);
            return _context3.abrupt("return", false);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 10]]);
  };
};

exports.getPreferences = getPreferences;

var updatePreferences = function updatePreferences(preferences) {
  return function _callee4(dispatch) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            dispatch(setPreferences(preferences));
            _context4.next = 4;
            return regeneratorRuntime.awrap(API.updatePreferences(preferences));

          case 4:
            _context4.next = 10;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            console.log("preference update failed", _context4.t0);
            return _context4.abrupt("return", false);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 6]]);
  };
};

exports.updatePreferences = updatePreferences;

var updateExerciseIndex = function updateExerciseIndex(exerciseIndex) {
  return function _callee5(dispatch) {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            dispatch(setExerciseIndex(exerciseIndex));
            _context5.next = 4;
            return regeneratorRuntime.awrap(API.updateExerciseIndex(exerciseIndex));

          case 4:
            _context5.next = 10;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);
            console.log("preference update failed", _context5.t0);
            return _context5.abrupt("return", false);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 6]]);
  };
};

exports.updateExerciseIndex = updateExerciseIndex;

var updateTarget = function updateTarget(weight, date) {
  return function _callee6(dispatch) {
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            dispatch(setTarget(weight, date));
            _context6.next = 4;
            return regeneratorRuntime.awrap(API.updateTarget(weight, date));

          case 4:
            _context6.next = 10;
            break;

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](0);
            console.log("target update failed", _context6.t0);
            return _context6.abrupt("return", false);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 6]]);
  };
};

exports.updateTarget = updateTarget;

var addFoods = function addFoods(calorieData) {
  return {
    type: actionTypes.ADD_CALORIE_DATA,
    payload: {
      calorieData: calorieData
    }
  };
};

exports.addFoods = addFoods;

var addCalorieData = function addCalorieData(calorieData) {
  return function _callee7(dispatch) {
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            dispatch(addFoods(calorieData));
            _context7.next = 8;
            break;

          case 4:
            _context7.prev = 4;
            _context7.t0 = _context7["catch"](0);
            console.log("food update failed ", _context7.t0);
            return _context7.abrupt("return", false);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 4]]);
  };
};

exports.addCalorieData = addCalorieData;