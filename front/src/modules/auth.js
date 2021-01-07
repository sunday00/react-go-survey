import { createAction, handleActions } from 'redux-actions';

const SET_USER_PROFILE = 'auth/SET_USER_PROFILE';
const SET_USER_PHOTO = 'auth/SET_USER_PHOTO';

const SET_USER_TAGS = 'auth/SET_USER_TAGS';

export const setUserProfile = createAction(
  SET_USER_PROFILE,
  (profile) => profile,
);

export const setUserPhoto = createAction(SET_USER_PHOTO, (photo) => photo);

export const setUserTags = createAction(SET_USER_TAGS, (tags) => tags);

const initialState = {
  user: {
    id: '',
    vendor: '',
    email: '',
    name: '',
    gender: '',
    ageRange: '',
  },
  photo: '',
  subInfo: {
    job: '',
    group: '',
    subGroup: '',
    interested: [],
  },
};

const auth = handleActions(
  {
    [SET_USER_PROFILE]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [SET_USER_PHOTO]: (state, { payload: photo }) => ({
      ...state,
      photo,
    }),
    [SET_USER_TAGS]: (state, { payload: tags }) => ({
      ...state,
      subInfo: {
        ...state.subInfo,
        interested: tags,
      },
    }),
  },
  initialState,
);

export default auth;
