import { IProject, IProjectAction, IProjectsState, ProjectActionEnum } from './projectTypes';

const getCopyProject = (state: IProjectsState, projectId: number) => {
  return state.projects.find((project) => project.id === projectId);
};

const initialState: IProjectsState = {
  projects: [
    {
      name: 'Create Amazon',
      id: 1,

      tasks: []
    },
    { name: 'Create AliExpress', id: 2, tasks: [] },
    { name: 'Dinner with my wife', id: 3, tasks: [] }
  ]
};

export const projectsReducer = (state = initialState, action: IProjectAction): IProjectsState => {
  switch (action.type) {
    case ProjectActionEnum.ADD_PROJECT:
      return { ...state };
    case ProjectActionEnum.ADD_NEWTASK_TOPROJECT: {
      const editedProject = getCopyProject(state, action.payload.projectId);

      const copyEditedProject = { ...editedProject };

      const tasks = (copyEditedProject as IProject).tasks.map((item) => item);

      tasks?.push(action.payload.id);

      copyEditedProject.tasks = tasks;

      const copyProjects = state.projects.map((project) =>
        project.id === action.payload.projectId ? copyEditedProject : project
      );

      return { ...state, projects: copyProjects as IProject[] };
    }

    case ProjectActionEnum.DELETE_PROJECT: {
      return { ...state };
    }
    case ProjectActionEnum.EDIT_PROJECT:
      return { ...state };
    default:
      return state;
  }
};
