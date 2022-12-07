export interface ITask {
  id: number;
  name: string;
  status: taskStatus;
  description: string;
  timeStartInProgress?: string;
  createDate: string;
  readyDate: string;
  priority: taskPriority;
  files: filesType[];
  isCanAddSubTask: boolean;
  comments: IComment[];
  subTasks: ISubTask[];
}
interface IEditedCommentsTask {
  taskId: number;
  comments: IComment[];
}

export type taskStatus = TaskStatus.DEVELOPMENT | TaskStatus.DONE | TaskStatus.QUEUE;
export type taskPriority = taskPriorityEnum.HEIGHT | taskPriorityEnum.STANDARD;

export interface IComment {
  id: number;
  content: string;
}

export interface ISubTask {
  id: number;
  subTaskDescription: string;
  ready: boolean;
}

export interface filesType {
  name: string;
  preview: string;
}

export enum taskPriorityEnum {
  STANDARD = 'standard',
  HEIGHT = 'height'
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
  DELETE_TASK = 'DELETE_TASK',
  ADD_COMMENT = 'ADD_COMMENT'
}

export type TaskAction = IAddTaskAction | IEditTaskAction | IDeleteTaskAction | IAddCommentAction;

interface IAddTaskAction {
  type: TaskActionEnum.ADD_TASK;
  payload: ITask;
}
interface IAddCommentAction {
  type: TaskActionEnum.ADD_COMMENT;
  payload: IEditedCommentsTask;
}
interface IEditTaskAction {
  type: TaskActionEnum.EDIT_TASK;
  payload: ITask;
}
interface IDeleteTaskAction {
  type: TaskActionEnum.DELETE_TASK;
  payload: number;
}
