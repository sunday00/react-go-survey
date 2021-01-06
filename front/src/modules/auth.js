import { createAction, handleActions } from 'redux-actions';

const SET_USER_PROFILE = 'auth/SET_USER_PROFILE';
const SET_USER_PHOTO = 'auth/SET_USER_PHOTO';

export const setUserProfile = createAction(
  SET_USER_PROFILE,
  (profile) => profile,
);

export const setUserPhoto = createAction(SET_USER_PHOTO, (photo) => photo);

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
  },
  initialState,
);

export default auth;
