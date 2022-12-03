import React, { FC, useEffect, useState } from 'react';
import './taskList.scss';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import {
  ITask,
  ITaskAction,
  TaskActionEnum,
  TaskStatus,
  taskStatus,
} from '../../store/reducers/tasks/taskTypes';
import { ITasksStatusSort } from '../../types/types';
import { ReactComponent as AddTask } from '../../assets/icons/add-svgrepo-com.svg';
import { Task } from './Task/Task';
import { Modal } from '../../Dialog/Modal';
import { AddTaskForm } from './AddTaskForm/AddTaskForm';

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
  const [justClickedColum, setJustClickOnColum] = useState('');
  const [status, setStatus] = useState<taskStatus>(TaskStatus.QUEUE);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    editedTask && dispatchEditedStatus(dispatch, editedTask);
  }, [editedTask]);

  useEffect(() => {
    justClickedColum &&
      setStatus([TaskStatus.QUEUE, TaskStatus.DEVELOPMENT, TaskStatus.DONE][+justClickedColum - 1]);
  }, [justClickedColum]);

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
        id: foundedTask.id,
        name: foundedTask.name,
        status: destColumn.name,
        createDate: foundedTask.createDate,
        isCanAddTask: foundedTask.isCanAddSubTask,
      };

      setEditedTask({ ...foundedTask, ...editedTask });

      // setColumns({
      //   ...columns,
      //   [source.droppableId]: {
      //     ...sourceColumn,
      //     items: sourceItems,
      //   },
      //   [destination.droppableId]: {
      //     ...destColumn,
      //     items: destItems,
      //   },
      // });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const Toggle = () => setIsOpen(!isOpen);

  const addTask = (arg: string) => {
    setJustClickOnColum(arg);

    setTimeout(() => setJustClickOnColum(''), 200);
    setIsOpen(true);
  };

  return (
    <div className={'taskList'}>
      <div style={{ pointerEvents: isOpen ? 'none' : 'initial' }} className={'taskList__wrap'}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'lightgrey',
                  borderRadius: '10px',
                }}
                key={columnId}
              >
                <div className="colum">
                  <div className="colum__headline">
                    <h2>{column.name}</h2>
                    <button
                      disabled={isOpen}
                      className={'addButton'}
                      onClick={() => addTask(columnId)}
                    >
                      <AddTask className={`${justClickedColum === columnId ? 'justClick' : ''}`} />
                      <span>add task</span>
                    </button>
                  </div>
                  <div className="colum__scrollBlock scrollBlock">
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={'scrollBlock__taskTape'}
                            style={{
                              background: snapshot.isDraggingOver ? 'lightblue' : 'transparent',
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id.toString()}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <Task
                                        task={item}
                                        isDragging={false}
                                        isDropAnimating={false}
                                        innerRef={provided.innerRef}
                                        draggableProps={provided.draggableProps}
                                        dragHandleProps={provided.dragHandleProps}
                                        {...item}
                                      />
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

      <Modal show={isOpen} close={Toggle}>
        <AddTaskForm status={status} close={Toggle} />
      </Modal>
    </div>
  );
};
