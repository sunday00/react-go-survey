import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import auth from './auth';
import system from './system';

const rootReducer = combineReducers({
  auth,
  system,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

export default store;
