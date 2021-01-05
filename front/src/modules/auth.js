const SET_USER_PROFILE = 'auth/SET_USER_PROFILE';
const SET_USER_PHOTO = 'auth/SET_USER_PHOTO';

export const setUserProfile = (user) => ({
  type: SET_USER_PROFILE,
  user,
});
export const setUserPhoto = (photo) => ({
  type: SET_USER_PHOTO,
  photo,
});

const initialState = {
  user: {
    id: '',
    vendor: '',
    email: '',
    name: '',
    gender: '',
    birthday: '',
  },
  photo: '',
  subInfo: {
    job: '',
    group: '',
    subGroup: '',
    interested: [],
  },
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        user: action.user,
      };
    case SET_USER_PHOTO:
      return {
        ...state,
        photo: action.photo,
      };
    default:
      return state;
  }
};

export default auth;
