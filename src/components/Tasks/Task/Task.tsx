import React, { FC } from 'react';
import { Draggable, DroppableProvided } from 'react-beautiful-dnd';
import { ITask } from '../../../store/reducers/tasks/taskTypes';
import './task.scss';
// import './cardRotateAnimation.scss';
import { ReactComponent as Edit } from '../../../assets/icons/edit-svgrepo-com.svg';
import { TaskBody } from './TaskBody/TaskBody';
import classNames from 'classnames';

interface ITaskProps extends DroppableProvided {
  ToggleEditModal: (arg: number) => void;
  items: ITask[];
  ToggleCommentModal: (arg: number) => void;
}

export const Task: FC<ITaskProps> = ({ ToggleEditModal, items, ToggleCommentModal }) => {
  return (
    <div>
      {items.map((item, index) => {
        return (
          <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
            {({ dragHandleProps, draggableProps, innerRef }, snapshot) => {
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
                    <span>{item.id}</span>
                    <span>{item.name}</span>

                    <button
                      type={'button'}
                      onClick={() => ToggleEditModal(item.id)}
                      className={'edit'}>
                      <Edit />
                    </button>
                  </div>

                  <div className="card">
                    <div className={classNames('card-side front')}>
                      <TaskBody
                        id={item.id}
                        name={item.name}
                        status={item.status}
                        description={item.description}
                        createDate={item.createDate}
                        priority={item.priority}
                        files={item.files}
                        isCanAddSubTask={item.isCanAddSubTask}
                        subTasks={item.subTasks}
                        readyDate={item.readyDate}
                        timeStartInProgress={item.timeStartInProgress}
                        comments={item.comments}
                      />
                    </div>
                  </div>
                  <div className="task__buttons">
                    <button type={'button'} onClick={() => ToggleEditModal(item.id)}>
                      + subtask
                    </button>
                    <button type={'button'} onClick={() => ToggleCommentModal(item.id)}>
                      + comment
                    </button>
                  </div>
                </div>
              );
            }}
          </Draggable>
        );
      })}
    </div>
  );
};
