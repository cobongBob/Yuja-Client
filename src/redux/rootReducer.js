import { combineReducers } from 'redux';
import YboardReducer from './board/youtube/yboardReducer';
import ThboardReducer from './board/thumbnail/thboardReducer';
import EboardReducer from './board/editer/eboardReducer';
import winBoardReducer from './board/winwin/winBoardReducer';
import loginReducer from './redux-login/loginReducer';
import mainReducer from './main/mainReducer';

const rootReducer = combineReducers({
  YboardReducer,
  ThboardReducer,
  EboardReducer,
  loginReducer,
  winBoardReducer,
  mainReducer,
});

export default rootReducer;
