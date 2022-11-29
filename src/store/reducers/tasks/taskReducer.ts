import { ITaskAction, ITasksState, TaskActionEnum, TaskStatus } from './taskTypes';

const initialState: ITasksState = {
  tasks: {
    1: { name: 'to eat', id: 1, status: TaskStatus.QUEUE },
    2: { name: 'to sleep', id: 2, status: TaskStatus.QUEUE },
    3: { name: 'to play', id: 3, status: TaskStatus.QUEUE },
    4: { name: 'to play', id: 4, status: TaskStatus.QUEUE },
    5: { name: 'to play', id: 5, status: TaskStatus.QUEUE },
    6: { name: 'to play', id: 6, status: TaskStatus.QUEUE },
    7: { name: 'to play', id: 7, status: TaskStatus.QUEUE },
    8: { name: 'to play', id: 8, status: TaskStatus.QUEUE },
    9: { name: 'to play', id: 9, status: TaskStatus.QUEUE },
    10: { name: 'to play', id: 10, status: TaskStatus.QUEUE },
    11: { name: 'to play', id: 11, status: TaskStatus.QUEUE },
    12: { name: 'to play', id: 12, status: TaskStatus.QUEUE },
    13: { name: 'to play', id: 13, status: TaskStatus.QUEUE },
    14: { name: 'to play', id: 14, status: TaskStatus.QUEUE },
    15: { name: 'to play', id: 15, status: TaskStatus.QUEUE }
  }
};

export const taskReducer = (state = initialState, action: ITaskAction): ITasksState => {
  switch (action.type) {
    case TaskActionEnum.ADD_TASK:
      return { ...state };
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
