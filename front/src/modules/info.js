import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api/search';

const READ_MY_SURVEYS = 'info/READ_MY_SURVEYS';
const READ_SURVEYS = 'info/READ_SURVEYS';
const READ_SURVEYS_DONE = 'info/READ_SURVEYS_DONE';

export const getMySurveys = createAction(READ_MY_SURVEYS, (surveys) => surveys);
export const getSurveys = createAction(READ_SURVEYS, (surveys) => surveys);

function* readMySurveysSaga(action) {
  const res = yield call(api.getMySurveys, action.payload);
  yield put({
    type: READ_SURVEYS_DONE,
    payload: res.data.surveys,
  });
}

function* readSurveysSaga(action) {
  const res = yield call(api.getSurveys, action.payload);
  yield put({
    type: READ_SURVEYS_DONE,
    payload: res.data.surveys,
  });
}

export function* infoSaga() {
  yield takeLatest(READ_MY_SURVEYS, readMySurveysSaga);
  yield takeLatest(READ_SURVEYS, readSurveysSaga);
}

const initialState = {
  surveys: [],
};

const info = handleActions(
  {
    [READ_SURVEYS_DONE]: (state, { payload: surveys }) => ({
      ...state,
      surveys: [...surveys],
    }),
  },
  initialState,
);

export default info;
