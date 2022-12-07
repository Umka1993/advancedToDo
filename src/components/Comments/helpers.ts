import { IComment } from '../../store/reducers/tasks/taskTypes';

export const commentCreator = (subTasks: IComment[], inputValue: string): IComment[] => {
  const newSubtasks = [...subTasks];

  const newSubtask: IComment = {
    id: subTasks.length + 1,
    content: inputValue
  };

  newSubtasks.push(newSubtask);

  return newSubtasks;
};
