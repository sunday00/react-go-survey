import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api/search';

const GET_JOBS = 'system/GET_JOBS';
const GET_JOBS_DONE = 'system/GET_JOBS_DONE';

export const getJobs = createAction(GET_JOBS);

function* getJobsSaga(action) {
  const jobs = yield call(api.getAllJobs);
  yield put({
    type: GET_JOBS_DONE,
    payload: jobs.data,
  });
}

export function* systemSaga() {
  yield takeLatest(GET_JOBS, getJobsSaga);
}

const initialState = {
  jobs: [],
};

const system = handleActions(
  {
    [GET_JOBS_DONE]: (state, action) => ({
      ...state,
      jobs: action.payload,
    }),
  },
  initialState,
);

export default system;
