import { TaskAction, ITasksState, TaskActionEnum } from './taskTypes';

const initialState: ITasksState = {
  tasks: {}
};

export const taskReducer = (state = initialState, action: TaskAction): ITasksState => {
  switch (action.type) {
    case TaskActionEnum.ADD_TASK: {
      const { id } = action.payload;

      const newTask = {
        ...state.tasks,
        [id]: action.payload
      };

      return { ...state, tasks: newTask };
    }
    case TaskActionEnum.ADD_COMMENT: {
      const { taskId, comments } = action.payload;

      const copyTasks = {
        ...state.tasks
      };
      copyTasks[taskId].comments = comments;

      return { ...state, tasks: copyTasks };
    }
    case TaskActionEnum.EDIT_TASK: {
      const { id } = action.payload;

      const copyTasks = {
        ...state.tasks,
        [id]: action.payload
      };

      return { ...state, tasks: copyTasks };
    }
    case TaskActionEnum.DELETE_TASK:
      return { ...state };
    default:
      return state;
  }
};
