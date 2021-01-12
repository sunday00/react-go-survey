import { createAction, handleActions } from 'redux-actions';

const SET_MAIN = 'survey/SET_MAIN';

export const setMain = createAction(SET_MAIN, (main) => main);

const initialState = {
  main: {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  },
};

const survey = handleActions(
  {
    [SET_MAIN]: (state, { payload: main }) => ({
      ...state,
      main,
    }),
  },
  initialState,
);

export default survey;
