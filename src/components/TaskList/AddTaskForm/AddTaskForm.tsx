import React, { FC, useEffect, useState } from 'react';
import '../ui/TaskForm/taskForm.scss';
import {
  ITask,
  ITaskAction,
  TaskActionEnum,
  taskStatus,
} from '../../../store/reducers/tasks/taskTypes';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { IProjectAction, ProjectActionEnum } from '../../../store/reducers/projects/projectTypes';
import { useLocation } from 'react-router-dom';
import { TaskForm } from '../ui/TaskForm/TaskForm';

interface IAddTaskForm {
  close: () => void;
  status: taskStatus;
}

export const AddTaskForm: FC<IAddTaskForm> = ({ close, status }) => {
  const [newTask, setNewTask] = useState<ITask>();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const dispatchNewTask = (dispatch: Dispatch<ITaskAction>, task: ITask) => {
    dispatch({ type: TaskActionEnum.ADD_TASK, payload: task });
  };
  const dispatchNewTaskToProject = (dispatch: Dispatch<IProjectAction>, task: ITask) => {
    const projectId = Number(pathname.split('/').pop());
    dispatch({ type: ProjectActionEnum.ADD_NEWTASK_TOPROJECT, payload: { projectId, ...task } });
  };

  useEffect(() => {
    newTask && dispatchNewTask(dispatch, newTask);
    newTask && dispatchNewTaskToProject(dispatch, newTask);
  }, [newTask]);

  console.log('add');

  return <TaskForm close={close} setData={setNewTask} status={status} />;
};
