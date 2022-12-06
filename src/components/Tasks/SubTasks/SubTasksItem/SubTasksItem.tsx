import React, { FC } from 'react';
import { ISubTask } from '../../../../store/reducers/tasks/taskTypes';
import './subTasksItem.scss';

interface ISubTasksItem extends ISubTask {
  editSubTasks: (id: number) => void;
}

export const SubTasksItem: FC<ISubTasksItem> = ({
  id,
  subTaskDescription,
  ready,
  editSubTasks,
}) => {
  return (
    <>
      <label className={'subtask'} htmlFor={`${id}`}>
        <input
          onClick={() => editSubTasks(id)}
          defaultChecked={ready}
          type="checkbox"
          name={`${id}`}
        />
        <span className="label-text"> {subTaskDescription}</span>
      </label>
    </>
  );
};
