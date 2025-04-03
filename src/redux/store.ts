import { createStore, applyMiddleware, combineReducers } from 'redux';
import notesReducer from './reducer';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  notes: notesReducer
});

const store = createStore(rootReducer , applyMiddleware(thunk));

export default store;