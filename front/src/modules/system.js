const PUSH_ERROR_MESSAGE = 'system/PUSH_ERROR_MESSAGE';

export const pushErrorMessage = (msg) => ({
  type: PUSH_ERROR_MESSAGE,
  msg,
});

const initialState = [];

const system = (state = initialState, action) => {
  switch (action.type) {
    case PUSH_ERROR_MESSAGE:
      return [
        ...state,
        {
          msgType: 'error',
          msg: action.msg,
        },
      ];
    default:
      return state;
  }
};

export default system;
