import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest, throttle } from 'redux-saga/effects';
import * as api from '../lib/api/search';

const GET_JOBS = 'system/GET_JOBS';
const GET_JOBS_DONE = 'system/GET_JOBS_DONE';
const GET_GROUPS = 'system/GET_GROUPS';
const GET_GROUPS_DONE = 'system/GET_GET_GROUPS_DONE';

export const getJobs = createAction(GET_JOBS, (text) => text);
export const getGroups = createAction(GET_GROUPS, (text) => text);

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

function* getGroupsSaga(action) {
  let groups;
  if (action.payload) {
    groups = yield call(api.getAllGroups, action.payload);
  } else {
    groups = yield call(api.getAllGroups);
  }
  yield put({
    type: GET_GROUPS_DONE,
    payload: groups.data,
  });
}

export function* systemSaga() {
  yield throttle(500, GET_JOBS, getJobsSaga);
  yield throttle(500, GET_GROUPS, getGroupsSaga);
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
    [GET_GROUPS_DONE]: (state, action) => ({
      ...state,
      groups: [
        ...state.groups,
        ...action.payload.filter((p) => state.groups.indexOf(p) < 0),
      ],
    }),
  },
  initialState,
);

export default system;
