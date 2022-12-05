import { DropResult } from 'react-beautiful-dnd';
import { ITask, tasksItem } from '../../../store/reducers/tasks/taskTypes';

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

    const editedTask = {
      id: foundedTask.id,
      name: foundedTask.name,
      status: destColumn.name,
      createDate: foundedTask.createDate,
      isCanAddTask: foundedTask.isCanAddSubTask
    };
    return { ...foundedTask, ...editedTask };
  }
};
