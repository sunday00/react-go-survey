import { combineReducers, createStore } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
