import React, { FC } from 'react';
import { PhotoCollection } from '../../ui/PhotoCollection/PhotoCollection';
import classNames from 'classnames';
import { ITask, TaskStatus } from '../../../../store/reducers/tasks/taskTypes';
import './taskBody.scss';
import { Timer } from '../../ui/Timer/Timer';
import { convertFormatReadyDate } from '../../ui/Timer/helpers';

export const TaskBody: FC<ITask> = ({
  subTasks,
  priority,
  timeStartInProgress,
  readyDate,
  createDate,
  description,
  files,
  status,
}) => {
  return (
    <div className="body">
      <table className="body__table">
        <tbody>
          <tr>
            <th>Priority:</th>
            <td>{priority}</td>
          </tr>

          <tr>
            <th>Create date:</th>
            <td>{new Date(createDate).toLocaleTimeString()}</td>
          </tr>

          <tr>
            <th>Ready date:</th>
            <td>{readyDate ? convertFormatReadyDate(readyDate) : 'not selected'}</td>
          </tr>

          {status === TaskStatus.DEVELOPMENT && timeStartInProgress && (
            <tr>
              <th>In Progress:</th>
              <td>{<Timer timeStartInProgress={timeStartInProgress} />}</td>
            </tr>
          )}

          <tr>
            <th>Status:</th>
            <td>{status}</td>
          </tr>
        </tbody>
      </table>

      <div className={'body__description description'}>
        <span className={'description__title'}>Description:</span>
        <textarea readOnly={true} value={description} />
      </div>

      {files?.length ? (
        <div className="body__files files">
          <span className={'files__title'}>Files:</span>
          <PhotoCollection stateValue={files ?? []} />
        </div>
      ) : (
        <></>
      )}

      {subTasks.length ? (
        <ul className={'body__subtasks'}>
          Subtasks:
          {subTasks.map((subtask) => (
            <li key={subtask.id} className={classNames('subtaskItem')}>
              {subtask.id}
              <span
                className={classNames({
                  ready: subtask.ready,
                })}
              >
                {subtask.subTaskDescription}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};
