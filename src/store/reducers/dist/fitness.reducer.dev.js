"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _initialState = require("./initialState");

var actionTypes = _interopRequireWildcard(require("../actions/actionTypes"));

var _utils = require("../../utils/utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initialState.fitnessState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actionTypes.SET_BMI_RECORDS:
      return (0, _utils.updateObject)(state, action.payload);

    case actionTypes.SET_PREFERENCES:
      return (0, _utils.updateObject)(state, action.payload);

    case actionTypes.SET_EXERCISE_INDEX:
      return (0, _utils.updateObject)(state, action.payload);

    case actionTypes.SET_TARGET:
      return (0, _utils.updateObject)(state, action.payload);

    case actionTypes.ADD_CALORIE_DATA:
      {
        //console.log(action.payload);
        // const {calorieData}=action.payload;
        // console.log(calorieData);
        var oldFoods = _toConsumableArray(state.calorieData);

        console.log("321");
        console.log(oldFoods);
        console.log("123");
        return (0, _utils.updateObject)(state, {
          calorieData: oldFoods.concat(action.payload.calorieData)
        });
      }

    default:
      return state;
  }
};

var _default = reducer;
exports["default"] = _default;