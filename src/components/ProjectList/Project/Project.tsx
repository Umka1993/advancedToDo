import React, { FC, useEffect, useState } from 'react';

import { NavLink, useLocation } from 'react-router-dom';
import './project.scss';
import { useTypedSelector } from '../../../hooks/useTypeSelector';

import { TaskList } from '../../TaskList/TaskList';
import { ITask, TaskStatus } from '../../../store/reducers/tasks/taskTypes';
import { IProject } from '../../../store/reducers/projects/projectTypes';
import { ITasksStatusSort } from '../../../types/types';

interface IProjectProps {
  project: IProject;
}

type ItemColumn = Record<number, { name: string; items: ITask[] }>;

export const Project: FC<IProjectProps> = ({ project }) => {
  const [projectTasks, setTaskList] = useState<ITask[]>([]);
  const [backPath, setBackPath] = useState<string>(' ');
  const [projectItemId, setProjectItemId] = useState<number>(0);
  const { pathname } = useLocation();
  const { tasks } = useTypedSelector((state) => state.tasks);
  const [tasksStatusSort, setTasksStatusSort] = useState<ITasksStatusSort>({
    developmentTaskList: [],
    queueTaskList: [],
    doneTaskList: []
  });
  const [columns, setColumns] = useState<ItemColumn | {}>();

  useEffect(() => {
    const currentProjectTasks = project.tasks.map((taskId) => tasks[taskId]);
    setTaskList(currentProjectTasks);

    !backPath && setBackPath(pathname.split('/').splice(-1, 1).toString());
  }, [tasks]);

  useEffect(() => {
    const developmentTaskList = projectTasks.filter(
      (task) => task.status === TaskStatus.DEVELOPMENT
    );
    const doneTaskList = projectTasks.filter((task) => task.status === TaskStatus.DONE);
    const queueTaskList = projectTasks.filter((task) => task.status === TaskStatus.QUEUE);

    setTasksStatusSort({
      developmentTaskList,
      doneTaskList,
      queueTaskList
    });
  }, [projectTasks]);

  useEffect(() => {
    const columnsObj = {
      '1': {
        name: TaskStatus.QUEUE,
        items: tasksStatusSort.queueTaskList
      },
      '2': {
        name: TaskStatus.DEVELOPMENT,
        items: tasksStatusSort.developmentTaskList
      },
      '3': {
        name: TaskStatus.DONE,
        items: tasksStatusSort.doneTaskList
      }
    };
    setColumns(columnsObj);
  }, [
    tasksStatusSort.developmentTaskList,
    tasksStatusSort.doneTaskList,
    tasksStatusSort.queueTaskList.length,
    tasks,
    tasksStatusSort
  ]);

  if (!columns) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else {
    return (
      <div className={'project'}>
        <NavLink to={`/${backPath}`} className="goBackButton">
          go back
        </NavLink>

        <h1>Project name: {'123'}</h1>
        <p>task list:</p>

        <TaskList setColumns={setColumns} columns={columns} tasksStatusSort={tasksStatusSort} />
      </div>
    );
  }
};
