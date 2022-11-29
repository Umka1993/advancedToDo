export interface ITask {
  id: number;
  name: string;
  status: TaskStatus.DEVELOPMENT | TaskStatus.DONE | TaskStatus.QUEUE;
}

export type tasksItem = Record<number, ITask>;

export interface ITasksState {
  tasks: tasksItem;
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
  payload: ITask;
}
interface IEditTaskAction {
  type: TaskActionEnum.EDIT_TASK;
  payload: ITask;
}
interface IDeleteTaskAction {
  type: TaskActionEnum.DELETE_TASK;
  payload: number;
}