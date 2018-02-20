import {combineReducers} from 'redux';
import loadingScreenStatus from './LoadingScreenReducer';
import scriptsData from './ScriptsReducer';

const appReducer = combineReducers({
  loadingScreenStatus,
  scriptsData
});

export default appReducer;
