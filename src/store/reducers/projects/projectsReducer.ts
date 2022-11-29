import { IProjectsState } from './projectTypes';

const initialState: IProjectsState = {
  projects: [
    {
      name: 'Create Amazon',
      id: 1,
      path: '/createAmazon',
      tasks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    },
    { name: 'Create AliExpress', id: 2, path: '/createAliExpress', tasks: [] },
    { name: 'Dinner with my wife', id: 3, path: '/dinner', tasks: [] }
  ]
};

export const projectsReducer = (
  state = initialState,
  action: { type: string; payload: any }
): IProjectsState => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return { ...state };
    case 'DELETE_PROJECT': {
      return { ...state };
    }
    case 'EDIT_PROJECT':
      return { ...state };
    default:
      return state;
  }
};
