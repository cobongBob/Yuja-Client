import { combineReducers } from "redux";
import YboardReducer from "./board/youtube/yboardReducer";
import ThboardReducer from "./board/thumbnail/thboardReducer";
import EboardReducer from "./board/editer/eboardReducer";
import winBoardReducer from "./board/winwin/winBoardReducer";
import loginReducer from "./redux-login/loginReducer";
import loadingReducer from "./loading/loadingReducer";

const rootReducer = combineReducers({
  YboardReducer,
  ThboardReducer,
  EboardReducer,
  loginReducer,
  winBoardReducer,
  loadingReducer,
});

export default rootReducer;
