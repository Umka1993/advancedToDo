import React, { FC, useEffect, useState } from 'react';
import '../ui/TaskForm/taskForm.scss';
import { ITask, ITaskAction, TaskActionEnum } from '../../../store/reducers/tasks/taskTypes';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { TaskForm } from '../ui/TaskForm/TaskForm';

interface IEditTaskForm {
  close: () => void;
  taskId: number;
}

export const EditTaskForm: FC<IEditTaskForm> = ({ close, taskId }) => {
  const [editedTask, setEditedTask] = useState<ITask>();

  const dispatch = useDispatch();

  const dispatchEditedTask = (dispatch: Dispatch<ITaskAction>, task: ITask) => {
    dispatch({ type: TaskActionEnum.EDIT_TASK, payload: task });
  };

  useEffect(() => {
    editedTask && dispatchEditedTask(dispatch, editedTask);
  }, [editedTask]);

  return <TaskForm close={close} setData={setEditedTask} taskId={taskId} />;
};
