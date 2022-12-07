import React, { FC, useEffect, useState } from 'react';
import './project.scss';

import { TaskList } from '../../Tasks/StatusList/TaskList';
import { ITask, TaskStatus } from '../../../store/reducers/tasks/taskTypes';
import { IProject } from '../../../store/reducers/projects/projectTypes';
import { ITasksStatusSort } from '../../../types/types';
import { GoBack } from '../../GoBack/GoBack';
import { Input } from '../../Tasks/ui/Input/Input';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { useDebounce } from '../../../hooks/useDebounse';

interface IProjectProps {
  project: IProject;
}

export type ItemColumn = Record<number, { name: string; items: ITask[] }>;

export const Project: FC<IProjectProps> = ({ project }) => {
  const [tasksStatusSort, setTasksStatusSort] = useState<ITasksStatusSort>({
    developmentTaskList: [],
    queueTaskList: [],
    doneTaskList: []
  });

  const [localState, setLocalState] = useState<ITask[]>();
  const [columns, setColumns] = useState<ItemColumn | {}>();
  const [searchParams, setSearchParams] = useState<string>('');
  const { tasks } = useTypedSelector((state) => state.tasks);

  const debouncedValue = useDebounce<string>(searchParams, 1000);

  useEffect(() => {
    const currentProjectTasks = project.tasks.map((taskId) => tasks[taskId]);

    if (searchParams) {
      const filteredTasks = currentProjectTasks.filter(
        (task) => task.id === +searchParams || task.name === searchParams
      );
      setLocalState(filteredTasks);
    } else {
      setLocalState(currentProjectTasks);
    }
  }, [tasks, debouncedValue]);

  useEffect(() => {
    if (localState) {
      const developmentTaskList = localState.filter(
        (task) => task.status === TaskStatus.DEVELOPMENT
      );
      const doneTaskList = localState.filter((task) => task.status === TaskStatus.DONE);
      const queueTaskList = localState.filter((task) => task.status === TaskStatus.QUEUE);

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
    }
  }, [localState]);

  console.log('renderc');
  if (!columns) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else {
    return (
      <div className={'project'}>
        <div className="project__headline">
          <GoBack />
          <h1>Project name: {project.name}</h1>

          <Input
            type={'text'}
            name={'search'}
            id={'search'}
            stateValue={searchParams ?? ''}
            setStateValue={setSearchParams}
            label={'Search'}
            required={false}
          />
        </div>

        <TaskList setColumns={setColumns} columns={columns} tasksStatusSort={tasksStatusSort} />
      </div>
    );
  }
};
