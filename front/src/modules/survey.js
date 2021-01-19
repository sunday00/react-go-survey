import { createAction, handleActions } from 'redux-actions';

const SET_MAIN = 'survey/SET_MAIN';
const SET_SUB = 'survey/SET_SUB';

export const setMain = createAction(SET_MAIN, (main) => main);
export const setSub = createAction(SET_SUB, (sub, part = 'whole') => {
  return part === 'whole' ? sub : { [part]: [...sub] };
});

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
  },
  initialState,
);

export default survey;
