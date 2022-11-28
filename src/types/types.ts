import { IProjectList, IRemovedTask } from '../data';

export interface ITodoListState {
  projectList: IProjectList[];
}

export enum TaskStatus {
  QUEUE = 'QUEUE',
  DEVELOPMENT = 'DEVELOPMENT',
  DONE = 'DONE'
}

export enum TaskActionEnum {
  ADD_TASK = 'ADD_TASK',
  EDIT_TASK = 'EDIT_TASK',
  DELETE_TASK = 'DELETE_TASK'
}

export type ITaskAction = IAddTaskAction | IEditTaskAction | IDeleteTaskAction;

interface IAddTaskAction {
  type: TaskActionEnum.ADD_TASK;
  payload: IRemovedTask;
}
interface IEditTaskAction {
  type: TaskActionEnum.EDIT_TASK;
  payload: IRemovedTask;
}
interface IDeleteTaskAction {
  type: TaskActionEnum.DELETE_TASK;
  payload: number;
}
