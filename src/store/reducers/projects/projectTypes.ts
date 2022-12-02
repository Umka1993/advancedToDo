import { ITask } from '../tasks/taskTypes';

export interface IProject {
  id: number;
  name: string;
  tasks: number[];
  path: string;
}

export interface IProjectsState {
  projects: IProject[];
}

export enum ProjectActionEnum {
  ADD_PROJECT = 'ADD_PROJECT',
  EDIT_PROJECT = 'EDIT_PROJECT',
  DELETE_PROJECT = 'DELETE_PROJECT',
  ADD_NEWTASK_TOPROJECT = ' ADD_NEWTASK_TOPROJECT'
}

interface IAddNewTaskToProject extends ITask {
  projectId: number;
}

export type IProjectAction =
  | IAddProjectAction
  | IEditProjectAction
  | IDeleteProjectAction
  | IAddNewTaskToProjectAction;

interface IAddProjectAction {
  type: ProjectActionEnum.ADD_PROJECT;
  payload: IProject;
}
interface IEditProjectAction {
  type: ProjectActionEnum.EDIT_PROJECT;
  payload: IProject;
}
interface IDeleteProjectAction {
  type: ProjectActionEnum.DELETE_PROJECT;
  payload: number;
}
interface IAddNewTaskToProjectAction {
  type: ProjectActionEnum.ADD_NEWTASK_TOPROJECT;
  payload: IAddNewTaskToProject;
}
