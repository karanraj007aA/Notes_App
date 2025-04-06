// appReducer.ts
import { SET_APP_TITLE } from './types';

const initialState = {
  title: '',
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_APP_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
