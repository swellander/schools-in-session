import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import schoolReducer from './school';
import studentReducer from './student';
import authReducer from './auth';

const reducer = combineReducers({
  auth: authReducer,
  schools: schoolReducer,
  students: studentReducer
});

export default createStore(reducer, applyMiddleware(thunk));