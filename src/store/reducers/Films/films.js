import {SET_PRELOADED_FILMS} from '../../actions/actionsType';

const initialState = {
  list: [],
};

const filmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRELOADED_FILMS:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default filmsReducer;
