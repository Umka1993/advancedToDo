import React, { FC, useEffect, useState } from 'react';

import './project.scss';
import { useTypedSelector } from '../../../hooks/useTypeSelector';

import { TaskList } from '../../Tasks/StatusList/TaskList';
import { ITask, TaskStatus } from '../../../store/reducers/tasks/taskTypes';
import { IProject } from '../../../store/reducers/projects/projectTypes';
import { ITasksStatusSort } from '../../../types/types';
import { GoBack } from '../../GoBack/GoBack';

interface IProjectProps {
  project: IProject;
}

export type ItemColumn = Record<number, { name: string; items: ITask[] }>;

export const Project: FC<IProjectProps> = ({ project }) => {
  const { tasks } = useTypedSelector((state) => state.tasks);
  const [tasksStatusSort, setTasksStatusSort] = useState<ITasksStatusSort>({
    developmentTaskList: [],
    queueTaskList: [],
    doneTaskList: []
  });
  const [columns, setColumns] = useState<ItemColumn | {}>();

  useEffect(() => {
    const currentProjectTasks = project.tasks.map((taskId) => tasks[taskId]);

    const developmentTaskList = currentProjectTasks.filter(
      (task) => task.status === TaskStatus.DEVELOPMENT
    );
    const doneTaskList = currentProjectTasks.filter((task) => task.status === TaskStatus.DONE);
    const queueTaskList = currentProjectTasks.filter((task) => task.status === TaskStatus.QUEUE);

    setTasksStatusSort({
      developmentTaskList,
      doneTaskList,
      queueTaskList
    });

    const columnsObj = {
      '1': {
        name: TaskStatus.QUEUE,
        items: queueTaskList
      },
      '2': {
        name: TaskStatus.DEVELOPMENT,
        items: developmentTaskList
      },
      '3': {
        name: TaskStatus.DONE,
        items: doneTaskList
      }
    };
    setColumns(columnsObj);
  }, [tasks]);

  if (!columns) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else {
    return (
      <div className={'project'}>
        <GoBack />

        <h1>Project name: {project.name}</h1>
        <TaskList setColumns={setColumns} columns={columns} tasksStatusSort={tasksStatusSort} />
      </div>
    );
  }
};
