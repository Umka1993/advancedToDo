import React, { FC, useEffect, useState } from 'react';
import './taskList.scss';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import {
  ITask,
  TaskAction,
  TaskActionEnum,
  taskStatus,
  TaskStatus
} from '../../../store/reducers/tasks/taskTypes';
import { ITasksStatusSort } from '../../../types/types';
import { onDragEnd } from './helpers';
import { StatusBoard } from './StatusBoard/StatusBoard';
import { Modal } from '../../Dialogs/Modal/Modal';
import { EditTaskForm } from '../EditTaskForm/EditTaskForm';
import { AddCommentsForm } from '../AddCommentsForm/AddCommentsForm';
import { AddTaskForm } from '../AddTaskForm/AddTaskForm';
import { useTypedSelector } from '../../../hooks/useTypeSelector';

interface ITaskList {
  tasksStatusSort: ITasksStatusSort;
  columns: ItemColumn;
  setColumns: (arg: ItemColumn) => void;
}

type ItemColumn = Record<number, { name: string; items: ITask[] }>;

export const TaskList: FC<ITaskList> = ({ columns }) => {
  const { tasks } = useTypedSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [editedTask, setEditedTask] = useState<ITask>();
  const [isOpenComments, setIsOpenComments] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [taskId, setTaskId] = useState<number>();
  const [status, setStatus] = useState<taskStatus>(TaskStatus.QUEUE);

  const openCommentModal = taskId && isOpenComments;
  const openEditModal = taskId && isOpenEditModal;
  const openAddModal = !taskId && isOpen;

  useEffect(() => {
    editedTask && dispatchEditedStatus(dispatch, editedTask);
  }, [editedTask]);

  const dispatchEditedStatus = (dispatch: Dispatch<TaskAction>, task: ITask) => {
    dispatch({ type: TaskActionEnum.EDIT_TASK, payload: task });
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const ToggleEditModal = (id?: number) => {
    setIsOpenComments(false);
    if (id) {
      setTaskId(id);
      setIsOpenEditModal(true);
      setIsOpen(true);
    } else {
      setIsOpenEditModal(false);
      handleModal();
      setIsOpen(false);
    }
  };
  const ToggleCommentModal = (id?: number) => {
    setIsOpenEditModal(false);
    if (id) {
      setTaskId(id);
      setIsOpenComments(true);
      handleModal();
      setIsOpen(true);
    } else {
      setIsOpenComments(false);
      handleModal();
      setIsOpen(false);
    }
  };

  const editStatusOnDrag = (result: DropResult) => {
    const taskAfterDrag = onDragEnd(result, columns, tasks);
    setEditedTask(taskAfterDrag);
  };

  return (
    <div className={'taskList'}>
      <div className={'taskList__wrap'}>
        <DragDropContext onDragEnd={(result) => editStatusOnDrag(result)}>
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'lightgrey',
                  borderRadius: '10px'
                }}
                key={columnId}>
                <StatusBoard
                  setIsOpen={setIsOpen}
                  setTaskId={setTaskId}
                  setStatus={setStatus}
                  ToggleCommentModal={ToggleCommentModal}
                  ToggleEditModal={ToggleEditModal}
                  columnId={columnId}
                  name={column.name}
                  items={column.items}
                />
              </div>
            );
          })}
        </DragDropContext>
      </div>

      <Modal setIsOpen={setIsOpen} show={isOpen}>
        {openEditModal ? <EditTaskForm taskId={taskId} close={ToggleEditModal} /> : <></>}

        {openCommentModal ? <AddCommentsForm taskId={taskId} /> : <></>}

        {openAddModal ? <AddTaskForm status={status} close={handleModal} /> : <></>}
      </Modal>
    </div>
  );
};
