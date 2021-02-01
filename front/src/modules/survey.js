import { createAction, handleActions } from 'redux-actions';

const SET_MAIN = 'survey/SET_MAIN';
const SET_SUB = 'survey/SET_SUB';
const PUSH_QUEST = 'survey/PUSH_QUEST';
const EDIT_QUEST = 'survey/EDIT_QUEST';
const REPLACE_OPTIONS = 'survey/REPLACE_OPTIONS';

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
  },
  initialState,
);

export default survey;
