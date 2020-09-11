import {combineReducers} from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import {persistReducer, createMigrate} from "redux-persist";

import auth from "./auth.reducer";
import user from "./user.reducer";
import call from "./call.reducer";
import app from "./app.reducer";
import trainer from './trainer.reducer';
import social from './social.reducer';
import fitness from './fitness.reducer';
import notification from './notification.reducer';

import * as actionTypes from "../actions/actionTypes";

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage
};

// Important, migrations have to be set up whenever a core part of initialState.js(or the data structure of application)
// has been modified. This is because the data structure becomes incompatible with existing applications.
// https://www.freecodecamp.org/news/how-to-use-redux-persist-when-migrating-your-states-a5dee16b5ead/
// Below is a simple example of a migration, which handles some trivial cases
const migrations = {
  0: (state) => {
    return {
      ...state
    }
  }
}
const rootPersistConfig = {
  key: "root",
  version: 2,
  storage: AsyncStorage,
  blacklist: ["auth"], // Do NOT persist the state of auth reducer, add other reducers here when needed
  migrate: createMigrate(migrations, {debug: true})
};

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  user,
  app,
  call,
  trainer,
  social,
  fitness,
  notification,
});

const rootReducer = (state, action) => {
  // This is how the state of application can be reset. Does not affect firebase authentication state
  if (action.type === actionTypes.RESET_APP) {
    state = undefined
  }
  return appReducer(state, action);
}

export default persistReducer(rootPersistConfig, rootReducer);
