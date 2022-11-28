import { combineReducers } from 'redux';
import { taskReducer } from './taskReducer';

export const rootReducer = combineReducers({
  projects: taskReducer
});

export type RootState = ReturnType<typeof rootReducer>;
