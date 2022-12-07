import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ISubTask } from '../../../store/reducers/tasks/taskTypes';
import './subTasks.scss';
import { ReactComponent as AddTask } from '../../../assets/icons/add-svgrepo-com.svg';
import { SubTasksItem } from './SubTasksItem/SubTasksItem';
import { editSubTasks, subtaskCreator } from './helpers';

interface ISubTasks {
  subTasks: ISubTask[];
  setSubtasks: (arg: ISubTask[]) => void;
}

export const SubTasks: FC<ISubTasks> = ({ subTasks, setSubtasks }) => {
  const [localSubTasks, setLocalSubTasks] = useState<ISubTask[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [justClicked, setJustClick] = useState(false);
  const [subTaskId, setSubtaskId] = useState<number>(0);

  useEffect(() => {
    setLocalSubTasks(subTasks);
  }, [subTasks]);

  const createSubtask = () => {
    setInputValue('');
    setJustClick((prevState) => !prevState);
    const newSubtasks = subtaskCreator(subTasks, inputValue);
    setSubtasks(newSubtasks);
    setTimeout(() => setJustClick(false), 300);
  };

  useEffect(() => {
    const checkedSubtasks = editSubTasks(subTaskId, localSubTasks);
    setSubtasks(checkedSubtasks);
  }, [subTaskId]);

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue.length && e.code === 'Enter') {
      createSubtask();
    }
  };

  return (
    <div className="subtasks">
      <div className={classNames('subtasks__form')}>
        <div className="subtasks__scroll">
          {localSubTasks ? (
            subTasks.map(({ subTaskDescription, id, ready }) => (
              <SubTasksItem
                editSubTasks={setSubtaskId}
                ready={ready}
                key={id}
                id={id}
                subTaskDescription={subTaskDescription}
              />
            ))
          ) : (
            <span>sub tasks empty</span>
          )}
        </div>

        <div className={' subtasks__input'}>
          <input
            onKeyUp={(e) => onKeyUp(e)}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            value={inputValue}
            placeholder={'add subtask...'}
            type="text"
            readOnly={false}
          />
          <button
            disabled={!inputValue}
            type={'button'}
            onClick={() => createSubtask()}
            className={classNames({
              justClick: justClicked
            })}>
            <AddTask />
          </button>
        </div>
      </div>
    </div>
  );
};
