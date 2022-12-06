import React, { FC } from 'react';
import { Draggable, DroppableProvided } from 'react-beautiful-dnd';
import { ITask } from '../../../store/reducers/tasks/taskTypes';
import './task.scss';
import { ReactComponent as Edit } from '../../../assets/icons/edit-svgrepo-com.svg';
import { PhotoCollection } from '../ui/PhotoCollection/PhotoCollection';

interface ITaskProps extends DroppableProvided {
  ToggleEditModal: (arg: number) => void;
  items: ITask[];
}

export const Task: FC<ITaskProps> = ({ ToggleEditModal, items }) => {
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
                    ...draggableProps.style,
                  }}
                >
                  <div className="task__headline">
                    <span>{item.id}</span>
                    <span>{item.name}</span>

                    <button onClick={() => ToggleEditModal(item.id)} className={'edit'}>
                      <Edit />
                    </button>
                  </div>
                  <div className="task__body">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th>Priority:</th>
                          <td>{item.priority}</td>
                        </tr>

                        <tr>
                          <th>Create date:</th>
                          <td>{item.createDate}</td>
                        </tr>

                        <tr>
                          <th>Ready date:</th>
                          <td>{item.readyDate}</td>
                        </tr>

                        <tr>
                          <th>In Progress:</th>
                          <td>{item.inProgressTime}</td>
                        </tr>

                        <tr>
                          <th>Status:</th>
                          <td>{item.status}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className={'description'}>
                      <span className={'description__title'}>Description:</span>
                      <textarea readOnly={true} value={item.description} />
                    </div>

                    <div className="files">
                      {item.files?.length ? (
                        <>
                          <span className={'files__title'}>Files:</span>
                          <PhotoCollection stateValue={item.files ?? []} />
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    {/* <SubTasks subTasks={item.subTasks} /> */}

                    <div className="buttons">
                      <button>+ comment</button>
                      <button onClick={() => ToggleEditModal(item.id)}>+ subtask</button>
                    </div>
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
