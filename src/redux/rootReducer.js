import { combineReducers } from 'redux';
import YboardReducer from './board/youtube/yboardReducer';
import ThboardReducer from './board/thumbnail/thboardReducer';
import EboardReducer from './board/editor/eboardReducer';

const rootReducer = combineReducers({
  YboardReducer,
  ThboardReducer,
  EboardReducer,
});

export default rootReducer;
