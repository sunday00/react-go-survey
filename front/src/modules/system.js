import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest, throttle } from 'redux-saga/effects';
import * as api from '../lib/api/search';

const GET_INITIAL_TAGS = 'system/GET_INITIAL_TAGS';
const GET_INITIAL_TAGS_DONE = 'system/GET_INITIAL_TAGS_DONE';
const GET_JOBS = 'system/GET_JOBS';
const GET_JOBS_DONE = 'system/GET_JOBS_DONE';
const GET_GROUPS = 'system/GET_GROUPS';
const GET_GROUPS_DONE = 'system/GET_GROUPS_DONE';
const GET_SUB_GROUPS = 'system/GET_SUB_GROUPS';
const GET_SUB_GROUPS_DONE = 'system/GET_SUB_GROUPS_DONE';
const GET_INTERESTED = 'system/GET_INTERESTED';
const GET_INTERESTED_DONE = 'system/GET_INTERESTED_DONE';

export const getInitialTags = createAction(GET_INITIAL_TAGS, (text) => text);
export const getJobs = createAction(GET_JOBS, (text) => text);
export const getGroups = createAction(GET_GROUPS, (text) => text);
export const getSubGroups = createAction(GET_SUB_GROUPS, (text) => text);
export const getInterested = createAction(GET_INTERESTED, (text) => text);

function* getInitialTagsSaga(action) {
  const initialTags = yield call(api.getInitialTags);
  yield put({
    type: GET_INITIAL_TAGS_DONE,
    payload: initialTags.data,
  });
}

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

function* getSubGroupsSaga(action) {
  let subGroups;
  if (action.payload) {
    subGroups = yield call(api.getAllSubGroups, action.payload);
  } else {
    subGroups = yield call(api.getAllSubGroups);
  }
  yield put({
    type: GET_SUB_GROUPS_DONE,
    payload: subGroups.data,
  });
}

function* getInterestedSaga(action) {
  let interests;
  if (action.payload) {
    interests = yield call(api.getAllInterests, action.payload);
  } else {
    interests = yield call(api.getAllInterests);
  }
  yield put({
    type: GET_INTERESTED_DONE,
    payload: interests.data,
  });
}

export function* systemSaga() {
  yield throttle(500, GET_INITIAL_TAGS, getInitialTagsSaga);
  yield throttle(500, GET_JOBS, getJobsSaga);
  yield throttle(500, GET_GROUPS, getGroupsSaga);
  yield throttle(500, GET_SUB_GROUPS, getSubGroupsSaga);
  yield throttle(500, GET_INTERESTED, getInterestedSaga);
}

const initialState = {
  jobs: [],
  groups: [],
  subGroups: [],
  interested: [],
};

const system = handleActions(
  {
    [GET_INITIAL_TAGS_DONE]: (state, action) => action.payload,
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
    [GET_SUB_GROUPS_DONE]: (state, action) => ({
      ...state,
      subGroups: [
        ...state.subGroups,
        ...action.payload.filter((p) => state.subGroups.indexOf(p) < 0),
      ],
    }),
    [GET_INTERESTED_DONE]: (state, action) => ({
      ...state,
      interested: [
        ...state.interested,
        ...action.payload.filter((p) => state.interested.indexOf(p) < 0),
      ],
    }),
  },
  initialState,
);

export default system;
