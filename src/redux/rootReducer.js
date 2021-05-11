import { combineReducers } from "redux";
import YboardReducer from "./board/youtube/yboardReducer";
import ThboardReducer from "./board/thumbnail/thboardReducer";
import EboardReducer from "./board/editer/eboardReducer";
import loginReducer from './redux-login/loginReducer';

const rootReducer = combineReducers({
  YboardReducer,
  ThboardReducer,
  EboardReducer,
  loginReducer
});

export default rootReducer;
