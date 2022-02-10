import { combineReducers } from 'redux';
import wallReducer from './wall';

const rootReducer = combineReducers({ wallReducer });

export default rootReducer;