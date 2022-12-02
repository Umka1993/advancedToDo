import React, { FC, useState } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { ITask } from '../../../store/reducers/tasks/taskTypes';
import './task.scss';
import classNames from 'classnames';
import { ReactComponent as Edit } from '../../../assets/icons/edit-svgrepo-com.svg';

type ITaskPropsExtended = DraggableStateSnapshot & DraggableProvided & ITask;

interface ITaskProps extends ITaskPropsExtended {
  task: ITask;
}

export const Task: FC<ITaskProps> = ({
  task,
  innerRef,
  draggableProps,
  dragHandleProps,
  ...snapshot
}) => {
  const [editTask, setEditTask] = useState<number>();
  const [isAddSubtask, setIsAddSubtask] = useState(false);

  return (
    <div
      className={'scrollBlock__item task'}
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      style={{
        backgroundColor: snapshot.isDragging ? '#263B4A' : '#c0bdbd',
        ...draggableProps.style
      }}>
      <div className="task__headline">
        <span>{task.id}</span>
        <span>{task.name}</span>

        <button onClick={() => setEditTask(task.id)} className={'edit'}>
          <Edit />
        </button>
      </div>

      <div className="task__body">
        <table className="table">
          <tbody>
            <tr>
              <th>Priority:</th>
              <td>{task.priority}</td>
            </tr>

            <tr>
              <th>Create date:</th>
              <td>{task.createDate}</td>
            </tr>

            <tr>
              <th>Ready date:</th>
              <td>{task.readyDate}</td>
            </tr>

            <tr>
              <th>In Progress:</th>
              <td>{task.inProgressTime}</td>
            </tr>

            <tr>
              <th>Status:</th>
              <td>{task.status}</td>
            </tr>
          </tbody>
        </table>

        <div className={'description'}>
          <span className={'description__title'}>Description:</span>
          <textarea readOnly={true} value={task.description} />
        </div>

        <div className="files">
          {/* {task.files?.length ? ( */}
          {/*  task.files.map((file) => <img key={file.type} alt={'file'} />) */}
          {/* ) : ( */}
          {/*  <span>no files</span> */}
          {/* )} */}
        </div>

        <div className="subtasks">
          <form className={classNames('subtasks__form')}>
            {task.subTasks ? (
              task.subTasks.map((subT) => (
                <label key={subT}>
                  <input type={'radio'} /> {subT}
                </label>
              ))
            ) : (
              <span>no subtasks</span>
            )}
          </form>
        </div>

        <div className="buttons">
          <button>+ comment</button>
          <button>+ subtask</button>
        </div>
      </div>
    </div>
  );
};
