import axios from 'axios';

import {rootURL} from '../constants/appConstants';

const instance = axios.create({
  baseURL: rootURL
});

// By default, all axios requests are logged only when device is connected to debugger
// Set this variable to true to log axios requests in terminal
const isDebuggingEnabled = (typeof atob !== 'undefined');

instance.interceptors.request.use(function (config) {

  isDebuggingEnabled && console.log("API Request", config);
  return config;
}, function (error) {
  console.log("API Request error", error);
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  // isDebuggingEnabled && console.log("API Request", config);
  isDebuggingEnabled && console.log("API Response", response);
  return response;
}, function (error) {
  if (error.response && error.response.status === 401)
    console.log("Unauthorized");
  console.log("API Response error", error);
  return Promise.reject(error);
});

export const validateResponseCode = (code) => {
  return Math.floor(code / 100) === 2;
};

export default instance;
