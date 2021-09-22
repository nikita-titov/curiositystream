import {
  SAVE_SIGN_UP_FIELDS,
  MAKE_USER_AUTHORIZED,
  SET_PRELOADED_FILMS,
} from '../actions/actionsType';

export const saveSignUpField = fieldData => dispatch => {
  dispatch({
    type: SAVE_SIGN_UP_FIELDS,
    payload: fieldData,
  });
};

export const setAuthorizedUser = user => dispatch => {
  dispatch({
    type: MAKE_USER_AUTHORIZED,
    payload: {user},
  });
};

export const completeAuthorization = () => dispatch => {
  dispatch({
    type: MAKE_USER_AUTHORIZED,
    payload: {
      isAuthComplete: true,
    },
  });
};

export const savePreloadedFilms = list => dispatch => {
  dispatch({
    type: SET_PRELOADED_FILMS,
    payload: list,
  });
};
