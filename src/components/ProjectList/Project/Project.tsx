import React, { FC, useEffect, useState } from 'react';

import { ITask } from '../../../data';
import { NavLink, useLocation } from 'react-router-dom';
import './project.scss';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { TaskList } from '../../TaskList/TaskList';
import { TaskStatus } from '../../../types/types';

interface IProject {
  projectItemName: string;
}

export const Project: FC<IProject> = ({ projectItemName }) => {
  const [taskArray, setTaskList] = useState<ITask[]>([]);
  const [backPath, setBackPath] = useState<string>(' ');
  const [projectItemId, setProjectItemId] = useState<number>(0);
  const { pathname } = useLocation();
  const { projectList } = useTypedSelector((state) => state.projects);
  const developmentTaskList = taskArray.filter((task) => task.status === TaskStatus.DEVELOPMENT);
  const doneTaskList = taskArray.filter((task) => task.status === TaskStatus.DONE);
  const queueTaskList = taskArray.filter((task) => task.status === TaskStatus.QUEUE);

  useEffect(() => {
    projectList.forEach(({ projectName, taskList, id }) => {
      if (projectName === projectItemName) {
        setTaskList(taskList);
        setProjectItemId(id);
      }
    });

    !backPath && setBackPath(pathname.split('/').splice(-1, 1).toString());
  }, [projectList]);

  return (
    <div className={'project'}>
      <NavLink to={`/${backPath}`} className="goBackButton">
        go back
      </NavLink>
      <div className="container">
        <h1>Project name: {projectItemName}</h1>
        <p>task list:</p>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <TaskList
          devTaskList={developmentTaskList}
          doneTaskList={doneTaskList}
          queueTaskList={queueTaskList}
          projectItemId={projectItemId}
          taskArray={taskArray}
        />
        {/* <TodoList projectItemId={projectItemId} projectTask={taskArray} /> */}
      </div>
    </div>
  );
};
