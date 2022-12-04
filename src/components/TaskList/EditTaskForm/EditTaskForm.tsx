import React, { FC, useEffect, useState } from 'react';
import '../ui/TaskForm/taskForm.scss';
import { ITask, ITaskAction, TaskActionEnum } from '../../../store/reducers/tasks/taskTypes';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { TaskForm } from '../ui/TaskForm/TaskForm';
import { Modal } from '../../Modal/Modal';

interface IEditTaskForm {
  close: () => void;
  taskId: number;
  isOpen: boolean;
}

export const EditTaskForm: FC<IEditTaskForm> = ({ close, taskId, isOpen }) => {
  const [editedTask, setEditedTask] = useState<ITask>();

  const dispatch = useDispatch();

  const dispatchNewTask = (dispatch: Dispatch<ITaskAction>, task: ITask) => {
    dispatch({ type: TaskActionEnum.EDIT_TASK, payload: task });
  };

  useEffect(() => {
    console.log('editedTask', editedTask);
    editedTask && dispatchNewTask(dispatch, editedTask);
  }, [editedTask]);

  return (
    <Modal show={isOpen} close={close}>
      <TaskForm close={close} setData={setEditedTask} taskId={taskId} />;
    </Modal>
  );
};
