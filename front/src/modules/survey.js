import { createAction, handleActions } from 'redux-actions';

const SET_MAIN = 'survey/SET_MAIN';
const SET_SUB = 'survey/SET_SUB';

export const setMain = createAction(SET_MAIN, (main) => main);
export const setSub = createAction(SET_SUB, (sub) => sub);

const initialState = {
  main: {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  },
  sub: {
    gender: 'notCare',
    jobs: [],
    groups: [],
    subGroups: [],
    interested: [],
  },
};

const survey = handleActions(
  {
    [SET_MAIN]: (state, { payload: main }) => ({
      ...state,
      main,
    }),
  },
  {
    [SET_SUB]: (state, { payload: sub }) => ({
      ...state,
      sub,
    }),
  },
  initialState,
);

export default survey;
