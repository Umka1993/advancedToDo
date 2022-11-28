import React, { FC, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { IProjectList, ITask } from '../../data';
import { TaskStatus } from '../../types/types';
import classNames from 'classnames';
import './todoList.scss';

interface ITodoList {
  projectItemId: number;
  projectTask: ITask[];
}

export const TodoList: FC<ITodoList> = ({ projectItemId, projectTask }) => {
  const [data, setData] = useState<IProjectList[]>([]);
  // const [developmentTaskList, setDevelopmentTaskList] = useState<ITask[]>([])
  const developmentTaskList = projectTask.filter((task) => task.status === TaskStatus.DEVELOPMENT);
  const doneTaskList = projectTask.filter((task) => task.status === TaskStatus.DONE);
  const queueTaskList = projectTask.filter((task) => task.status === TaskStatus.QUEUE);

  console.log(developmentTaskList);

  const deleteItem = (id: number) => {
    setData(data.filter((x) => x.id !== id));
  };

  const handleEnd = (result: any) => {
    console.log(result);
    if (!result.destination) return; // if no destination exits(cancel event), exit this function
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="to-dos">
          {(provided) => (
            <ul className={'todoList'} {...provided.droppableProps} ref={provided.innerRef}>
              {developmentTaskList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <li
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      key={item.id}
                      className={classNames('not-selected', {
                        selected: snapshot.isDragging,
                        development: item.status === TaskStatus.DEVELOPMENT,
                        done: item.status === TaskStatus.DONE,
                        queue: item.status === TaskStatus.QUEUE
                      })}>
                      {index + 1}.{item.taskName}
                      {/* <button onClick={() => deleteItem(item.id)}>Delete</button> */}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
