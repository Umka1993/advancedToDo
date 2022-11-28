import { ITaskAction, ITodoListState, TaskActionEnum, TaskStatus } from '../../types/types';
import { IProjectList } from '../../data';

const initialState: ITodoListState = {
  projectList: [
    {
      id: 1,
      projectName: 'Create Amazon',
      path: '/createAmazon',
      taskList: [
        { id: 1, taskName: 'design', status: TaskStatus.DEVELOPMENT, taskBody: {} },

        { id: 2, taskName: 'layout', status: TaskStatus.DEVELOPMENT, taskBody: {} },

        { id: 3, taskName: 'development', status: TaskStatus.DEVELOPMENT, taskBody: {} }
      ]
    },
    {
      id: 2,
      projectName: 'Create AliExpress',
      path: '/createAliExpress',
      taskList: []
    },
    {
      id: 3,
      path: '/dinner',
      projectName: 'Dinner with my wife',
      taskList: []
    }
  ]
};

export const taskReducer = (state = initialState, action: ITaskAction): ITodoListState => {
  switch (action.type) {
    case TaskActionEnum.ADD_TASK:
      return { ...state };
    case TaskActionEnum.EDIT_TASK: {
      const { projectId, id } = action.payload;

      const foundedProject = state.projectList.find((project) => project.id === projectId);

      const editTask = {
        id: action.payload.id,
        status: action.payload.status,
        taskBody: action.payload.taskBody,
        taskName: action.payload.taskName
      };

      const editedTaskList = foundedProject?.taskList.map((task) =>
        task.id === id ? editTask : task
      );

      const editedProject = foundedProject && { ...foundedProject, taskList: editedTaskList };

      const editedProjectList = state.projectList.map((project) =>
        project.id === projectId ? editedProject : project
      );

      // console.log('editedProjectList', editedProjectList);

      return { ...state, projectList: editedProjectList as IProjectList[] };
    }
    case TaskActionEnum.DELETE_TASK:
      return { ...state };
    default:
      return state;
  }
};
