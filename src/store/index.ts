import { createStore, EmptyObject } from 'redux';
import { rootReducer } from './reducers';
import { ITasksState } from './reducers/tasks/taskTypes';
import { IProjectsState } from './reducers/projects/projectTypes';

function saveToLocalStorage(state: EmptyObject & { tasks: ITasksState; projects: IProjectsState }) {
  console.log(state);
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('persistantState', serialisedState);
  } catch (e) {
    console.warn(e);
  }
}
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem('persistantState');
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const store = createStore(rootReducer, loadFromLocalStorage());

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
