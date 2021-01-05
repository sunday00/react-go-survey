const SET_ACCESS_KEY = 'auth/SET_ACCESS_KEY';

export const setAccessKey = (accessKey) => ({
  type: SET_ACCESS_KEY,
  accessKey,
});

const initialState = {
  accessKey: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCESS_KEY:
      return {
        ...state,
        accessKey: action.accessKey,
      };
    default:
      return state;
  }
};

export default auth;
