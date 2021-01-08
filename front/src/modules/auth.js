import { createAction, handleActions } from 'redux-actions';

const SET_USER_PROFILE = 'auth/SET_USER_PROFILE';
const SET_USER_PHOTO = 'auth/SET_USER_PHOTO';
const SET_USER_SUB_INFO = 'auth/SET_USER_SUB_INFO';
const SET_USER_TAGS = 'auth/SET_USER_TAGS';
const SET_SIGNED = 'auth/SET_SIGNED';

export const setUserProfile = createAction(
  SET_USER_PROFILE,
  (profile) => profile,
);

export const setUserPhoto = createAction(SET_USER_PHOTO, (photo) => photo);
export const setUserSubInfo = createAction(SET_USER_SUB_INFO, (info) => info);
export const setUserTags = createAction(SET_USER_TAGS, (tags) => tags);

export const setSigned = createAction(SET_SIGNED, (isSigned) => !isSigned);

const initialState = {
  user: {
    vendorId: '',
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
  isSigned: false,
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
    [SET_USER_SUB_INFO]: (state, { payload: info }) => ({
      ...state,
      subInfo: {
        ...state.subInfo,
        [info.key]: info.value,
      },
    }),
    [SET_USER_TAGS]: (state, { payload: tags }) => ({
      ...state,
      subInfo: {
        ...state.subInfo,
        interested: tags,
      },
    }),
    [SET_SIGNED]: (state, { payload: isSigned }) => ({
      ...state,
      isSigned,
    }),
  },
  initialState,
);

export default auth;
