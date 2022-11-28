import { TaskStatus } from './types/types';

export interface ITask {
  id: number;
  // projectId: number;
  taskName: string;
  taskBody: any;
  status: TaskStatus.DEVELOPMENT | TaskStatus.DONE | TaskStatus.QUEUE;
}
export interface IRemovedTask extends ITask {
  projectId: number;
}
export interface IProjectList {
  id: number;
  projectName: string;
  path: string;
  taskList: ITask[];
}

// export const projectList = [
//   {
//     id: 1,
//     projectName: 'Create Amazon',
//     path: '/createAmazon',
//   },
//   {
//     id: 2,
//     projectName: 'Create AliExpress',
//     path: '/createAliExpress',
//   },
//   {
//     id: 3,
//     path: '/dinner',
//     projectName: 'Dinner with my wife',
//   },
// ];
