import { createStore, applyMiddleware, combineReducers } from 'redux';
import notesReducer from './reducer';
import { thunk } from 'redux-thunk';
import appReducer from './appReducer';
const rootReducer = combineReducers({
  notes: notesReducer,
  app: appReducer, // ✅ mount the app reducer
});

const store = createStore(rootReducer , applyMiddleware(thunk));

export default store;