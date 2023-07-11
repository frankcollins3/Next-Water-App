import { combineReducers } from '@reduxjs/toolkit';
import mainReducer, { MainState } from 'redux/main/mainSlice';

const rootReducer = combineReducers({
  main: mainReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
