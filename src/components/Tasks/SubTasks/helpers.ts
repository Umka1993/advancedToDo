import { ISubTask } from '../../../store/reducers/tasks/taskTypes';

export const editSubTasks = (id: number, localSubTasks: ISubTask[]) => {
  return localSubTasks.map((subtask) => {
    if (subtask.id === id) {
      const subTask: ISubTask = {
        id: subtask.id,
        ready: !subtask.ready,
        subTaskDescription: subtask.subTaskDescription
      };
      return subTask;
    } else {
      return subtask;
    }
  });
};

export const subtaskCreator = (subTasks: ISubTask[], inputValue: string) => {
  const newSubtasks = [...subTasks];

  const newSubtask: ISubTask = {
    id: subTasks.length + 1,
    subTaskDescription: inputValue,
    ready: false
  };

  newSubtasks.push(newSubtask);

  return newSubtasks;
};
