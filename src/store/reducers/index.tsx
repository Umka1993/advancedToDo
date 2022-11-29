import { combineReducers } from 'redux';
import { taskReducer } from './tasks/taskReducer';
import { projectsReducer } from './projects/projectsReducer';

export const rootReducer = combineReducers({
  tasks: taskReducer,
  projects: projectsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
