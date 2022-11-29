export interface IProject {
  id: number;
  name: string;
  tasks: number[];
  path: string;
}

export interface IProjectsState {
  projects: IProject[];
}
