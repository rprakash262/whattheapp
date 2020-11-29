import { combineReducers } from 'redux';

import LayoutReducer from './LayoutReducer';
import LoginReducer from './LoginReducer';

const rootReducer = combineReducers({
  layout: LayoutReducer,
  login: LoginReducer,
});

export default rootReducer;