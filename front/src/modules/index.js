import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import auth from './auth';
import system, { systemSaga } from './system';
import survey, { surveySaga } from './survey';
import results, { resultSaga } from './result';
import info, { infoSaga } from './info';

const rootReducer = combineReducers({
  auth,
  system,
  survey,
  results,
  info,
});

export function* rootSaga() {
  yield all([systemSaga(), surveySaga(), resultSaga(), infoSaga()]);
}

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 100,
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
