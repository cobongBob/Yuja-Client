import { combineReducers } from 'redux';
import YboardReducer from './yboardReducer';
import loginReducer from './redux-login/loginReducer';

const rootReducer = combineReducers({
  YboardReducer,
  loginReducer
});

export default rootReducer;
