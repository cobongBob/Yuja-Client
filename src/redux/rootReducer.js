import { combineReducers } from "redux";
import YboardReducer from "./board/youtube/yboardReducer";
import EboardReducer from "./board/editer/eboardReducer";
import winBoardReducer from "./board/winwin/winBoardReducer";
import loginReducer from "./redux-login/loginReducer";
import mainReducer from "./main/mainReducer";
import loadingReducer from "./loading/loadingReducer";
import NotiReducer from "./loading/notiReducer";

const rootReducer = combineReducers({
  YboardReducer,
  EboardReducer,
  loginReducer,
  winBoardReducer,
  mainReducer,
  loadingReducer,
  NotiReducer,
});

export default rootReducer;
