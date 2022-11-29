import React, { FC, useEffect, useState } from 'react';
import './taskList.scss';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { ITask, ITaskAction, TaskActionEnum } from '../../store/reducers/tasks/taskTypes';
import { ITasksStatusSort } from '../../types/types';

interface ITaskList {
  tasksStatusSort: ITasksStatusSort;
  columns: ItemColumn;
  setColumns: (arg: ItemColumn) => void;
}

type ItemColumn = Record<number, { name: string; items: ITask[] }>;

export const TaskList: FC<ITaskList> = ({ tasksStatusSort, columns, setColumns }) => {
  const dispatch = useDispatch();
  const { tasks } = useTypedSelector((state) => state.tasks);
  const [editedTask, setEditedTask] = useState<ITask>();

  useEffect(() => {
    editedTask && dispatchEditedStatus(dispatch, editedTask);
  }, [editedTask]);

  const dispatchEditedStatus = (dispatch: Dispatch<ITaskAction>, task: ITask) => {
    dispatch({ type: TaskActionEnum.EDIT_TASK, payload: task });
  };

  const onDragEnd = (
    result: DropResult,
    columns: { [p: string]: any },
    setColumns: (arg0: any) => void
  ) => {
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
        id: removed.id,
        status: destColumn.name,
        taskBody: {},
        name: foundedTask.name
      };
      setEditedTask(editedTask);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  return (
    <div className={'taskList__wrap'}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '30%'
              }}
              key={columnId}>
              <h2>{column.name}</h2>
              <div className="scrollBlock">
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                            padding: 4,
                            width: 250,
                            minHeight: 500
                          }}>
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id.toString()}
                                index={index}>
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none',
                                        padding: 16,
                                        margin: '0 0 8px 0',
                                        minHeight: '50px',
                                        backgroundColor: snapshot.isDragging
                                          ? '#263B4A'
                                          : '#456C86',
                                        color: 'white',
                                        ...provided.draggableProps.style
                                      }}>
                                      {item.name}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};
