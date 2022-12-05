import React, { FC, useEffect, useState } from 'react';
import '../ui/TaskForm/taskForm.scss';
import { ITask, TaskAction, TaskActionEnum } from '../../../store/reducers/tasks/taskTypes';
import { useDispatch } from 'react-redux';
import { TaskForm } from '../ui/TaskForm/TaskForm';
import { Dispatch } from 'redux';

interface IEditTaskForm {
  close: () => void;
  taskId: number;
}

export const EditTaskForm: FC<IEditTaskForm> = ({ close, taskId }) => {
  const [editedTask, setEditedTask] = useState<ITask>();
  const dispatch = useDispatch();

  const dispatchEditTask = (dispatch: Dispatch<TaskAction>, task: ITask) => {
    return dispatch({ type: TaskActionEnum.ADD_TASK, payload: task });
  };

  useEffect(() => {
    editedTask && dispatchEditTask(dispatch, editedTask);
  }, [editedTask]);

  return <TaskForm close={close} setData={setEditedTask} taskId={taskId} />;
};
