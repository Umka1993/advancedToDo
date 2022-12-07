import { DropResult } from 'react-beautiful-dnd';
import { ITask, tasksItem, TaskStatus } from '../../../store/reducers/tasks/taskTypes';

export const onDragEnd = (
  result: DropResult,
  columns: { [p: string]: any },
  tasks: tasksItem
): ITask | undefined => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    const foundedTask = tasks[removed.id];

    const editedTask: ITask = {
      id: foundedTask.id,
      name: foundedTask.name,
      status: destColumn.name,
      timeStartInProgress:
        destColumn.name === TaskStatus.DEVELOPMENT
          ? new Date().toString()
          : foundedTask.timeStartInProgress,
      isCanAddSubTask: foundedTask.isCanAddSubTask,
      readyDate: foundedTask.readyDate,
      createDate: foundedTask.createDate,
      files: foundedTask.files,
      priority: foundedTask.priority,
      description: foundedTask.description,
      subTasks: foundedTask.subTasks,
      comments: foundedTask.comments
    };
    return { ...foundedTask, ...editedTask };
  }
};
