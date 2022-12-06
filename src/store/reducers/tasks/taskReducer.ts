import { TaskAction, ITasksState, TaskActionEnum } from './taskTypes';

const initialState: ITasksState = {
  tasks: {
    // 1: {
    //   name: 'to eat',
    //   id: 1,
    //   status: TaskStatus.QUEUE,
    //   comments: [1, 2],
    //   createDate: '',
    //   description: 'just do it',
    //   files: [],
    //   inProgressTime: '00.20',
    //   isCanAddSubTask: true,
    //   priority: taskPriorityEnum.STANDARD,
    //   readyDate: '',
    //   subTasks: [],
    // },
  },
};

export const taskReducer = (state = initialState, action: TaskAction): ITasksState => {
  switch (action.type) {
    case TaskActionEnum.ADD_TASK: {
      const { id } = action.payload;
      console.log('add reducer', action.payload);

      const newTask = {
        ...state.tasks,
        [id]: action.payload,
      };

      return { ...state, tasks: newTask };
    }
    case TaskActionEnum.EDIT_TASK: {
      const { id } = action.payload;
      console.log('edit reducer', action.payload);

      const copyTasks = {
        ...state.tasks,
        [id]: action.payload,
      };

      return { ...state, tasks: copyTasks };
    }
    case TaskActionEnum.DELETE_TASK:
      return { ...state };
    default:
      return state;
  }
};
