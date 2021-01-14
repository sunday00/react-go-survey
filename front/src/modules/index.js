import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import auth from './auth';
import system, { systemSaga } from './system';
import survey from './survey';

const rootReducer = combineReducers({
  auth,
  system,
  survey,
});

export function* rootSaga() {
  yield all([systemSaga()]);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
