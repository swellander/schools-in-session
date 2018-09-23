import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import schoolReducer from './school';
import studentReducer from './student';

const reducer = combineReducers({
  schools: schoolReducer,
  students: studentReducer
});

export default createStore(reducer, applyMiddleware(thunk));