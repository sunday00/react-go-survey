import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import auth from './auth';
import system from './system';
import survey from './survey';

const rootReducer = combineReducers({
  auth,
  system,
  survey,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

export default store;
