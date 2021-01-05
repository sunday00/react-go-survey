import { combineReducers, createStore } from 'redux';
import auth from './auth';
import system from './system';

const rootReducer = combineReducers({
  auth,
  system,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
