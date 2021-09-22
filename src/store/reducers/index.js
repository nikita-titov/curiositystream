import {combineReducers} from 'redux';
import authReducer from './Auth/auth';
import filmsReducer from './Films/films';

export default combineReducers({
  auth: authReducer,
  films: filmsReducer,
});
