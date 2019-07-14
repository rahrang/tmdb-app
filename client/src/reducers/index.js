import { combineReducers } from 'redux';

import search from './search';
import movie from './movie';
import configuration from './configuration';
import session from './session';

export default combineReducers({
  search,
  movie,
  configuration,
  session,
});
