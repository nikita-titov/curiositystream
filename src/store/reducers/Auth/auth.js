import {
  SAVE_SIGN_UP_FIELDS,
  MAKE_USER_AUTHORIZED,
} from '../../actions/actionsType';

const initialState = {
  user: {
    name: '',
    email: '',
    password: '',
  },
  isAuthComplete: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SIGN_UP_FIELDS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case MAKE_USER_AUTHORIZED:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
