import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest, throttle } from 'redux-saga/effects';
import * as api from '../lib/api/search';

const GET_JOBS = 'system/GET_JOBS';
const GET_JOBS_DONE = 'system/GET_JOBS_DONE';

export const getJobs = createAction(GET_JOBS, (text) => text);

function* getJobsSaga(action) {
  let jobs;
  if (action.payload) {
    jobs = yield call(api.getAllJobs, action.payload);
  } else {
    jobs = yield call(api.getAllJobs);
  }
  yield put({
    type: GET_JOBS_DONE,
    payload: jobs.data,
  });
}

export function* systemSaga() {
  yield throttle(500, GET_JOBS, getJobsSaga);
}

const initialState = {
  jobs: [],
};

const system = handleActions(
  {
    [GET_JOBS_DONE]: (state, action) => ({
      ...state,
      jobs: [
        ...state.jobs,
        ...action.payload.filter((p) => state.jobs.indexOf(p) < 0),
      ],
    }),
  },
  initialState,
);

export default system;
