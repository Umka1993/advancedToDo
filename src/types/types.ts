import { ITask } from '../store/reducers/tasks/taskTypes';

export interface ITasksStatusSort {
  developmentTaskList: ITask[];
  doneTaskList: ITask[];
  queueTaskList: ITask[];
}
