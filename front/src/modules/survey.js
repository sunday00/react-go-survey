import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api/search';

const SET_MAIN = 'survey/SET_MAIN';
const SET_SUB = 'survey/SET_SUB';
const PUSH_QUEST = 'survey/PUSH_QUEST';
const EDIT_QUEST = 'survey/EDIT_QUEST';
const REPLACE_OPTIONS = 'survey/REPLACE_OPTIONS';
const READ_SURVEY = 'survey/READ_SURVEY';
const READ_SURVEY_DONE = 'survey/READ_SURVEY_DONE';

export const setMain = createAction(SET_MAIN, (main) => main);
export const setSub = createAction(SET_SUB, (sub, part = 'whole') => {
  return part === 'whole' ? sub : { [part]: [...sub] };
});

export const pushQuest = createAction(PUSH_QUEST, (quest) => quest);
export const editQuest = createAction(EDIT_QUEST, (quest, idx) => ({ quest, idx }));

export const replaceOptions = createAction(REPLACE_OPTIONS, (options, questionId) => ({
  options,
  questionId,
}));

export const read = createAction(READ_SURVEY, (survey) => survey);

function* readSurveySaga(action) {
  const survey = yield call(api.getOneSurvey, action.payload);
  yield put({
    type: READ_SURVEY_DONE,
    payload: survey.data.result,
  });
}

export function* surveySaga() {
  yield takeLatest(READ_SURVEY, readSurveySaga);
}

const initialState = {
  main: {
    title: '',
    description: '',
    start: '',
    end: '',
  },
  sub: {
    gender: 'notCare',
    jobs: [],
    groups: [],
    subGroups: [],
    interested: [],
    age: '',
    subAgeMin: '',
    subAgeMax: '',
  },
  questions: [],
};

const survey = handleActions(
  {
    [SET_MAIN]: (state, { payload: main }) => ({
      ...state,
      main,
    }),
    [SET_SUB]: (state, { payload: sub }) => ({
      ...state,
      sub: {
        ...state.sub,
        ...sub,
      },
    }),
    [PUSH_QUEST]: (state, { payload: quest }) => ({
      ...state,
      questions: [...state.questions, quest],
    }),
    // [EDIT_QUEST]: (state, { payload: quest, idx }) => ({
    //   ...state,
    //   questions: state.questions.splice(idx, 1, quest),
    // }),
    [EDIT_QUEST]: (state, { payload: quest, idx }) => {
      const newQuestions = state.questions.map((q) => (q.no === idx ? quest : q));
      return {
        ...state,
        questions: [...newQuestions],
      };
    },
    [REPLACE_OPTIONS]: (state, { payload: { options, questionId } }) => {
      const newQuestions = state.questions.map((q) => {
        if (q.no !== questionId) return q;
        const newQ = { ...q };
        newQ.options = options;
        return newQ;
      });
      return {
        ...state,
        questions: [...newQuestions],
      };
    },
    [READ_SURVEY_DONE]: (state, { payload }) => {
      return {
        main: {
          title: payload.title,
          description: payload.description,
          start: payload.start,
          end: payload.end,
        },
        sub: {
          gender: payload.gender,
          jobs: payload.jobs,
          groups: payload.groups,
          subGroups: payload.subGroups,
          interested: payload.interested,
          age: payload.age,
          subAgeMin: payload.subAgeMin,
          subAgeMax: payload.subAgeMax,
        },
        questions: payload.surveys,
      };
    },
  },
  initialState,
);

export default survey;
