import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api/search';

const READ_RESULT = 'result/READ_RESULT';
const READ_RESULT_DONE = 'result/READ_RESULT_DONE';

export const read = createAction(READ_RESULT, (survey) => survey);

function* readResultSaga(action) {
  const res = yield call(api.getResult, action.payload);
  yield put({
    type: READ_RESULT_DONE,
    payload: res.data.results,
  });
}

export function* resultSaga() {
  yield takeLatest(READ_RESULT, readResultSaga);
}

const initialState = {
  title: '',
  results: [],
};

const results = handleActions(
  {
    [READ_RESULT_DONE]: (state, { payload: results }) => ({
      title: results.title,
      results: [...results.results],
    }),
  },
  initialState,
);

export default results;
