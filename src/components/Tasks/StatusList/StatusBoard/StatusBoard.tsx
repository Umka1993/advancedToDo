import React, { FC, useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ITask, TaskStatus } from '../../../../store/reducers/tasks/taskTypes';
import { ReactComponent as AddTask } from '../../../../assets/icons/add-svgrepo-com.svg';
import { Task } from '../../Task/Task';

interface IStatusBoard {
  items: ITask[];
  name: string;
  columnId: string;
  ToggleCommentModal: () => void;
  ToggleEditModal: () => void;
  setTaskId: (arg: number) => void;
  setIsOpen: (arg: boolean) => void;
  setStatus: (arg: TaskStatus) => void;
}

export const StatusBoard: FC<IStatusBoard> = ({
  setIsOpen,
  setTaskId,
  columnId,
  items,
  name,
  ToggleCommentModal,
  ToggleEditModal,
  setStatus
}) => {
  const [justClickedColum, setJustClickOnColum] = useState('');

  const createTask = (arg: string) => {
    setTaskId(0);
    setJustClickOnColum(arg);
    setTimeout(() => setJustClickOnColum(''), 200);
    setIsOpen(true);
  };

  useEffect(() => {
    justClickedColum &&
      setStatus([TaskStatus.QUEUE, TaskStatus.DEVELOPMENT, TaskStatus.DONE][+justClickedColum - 1]);
  }, [justClickedColum]);

  return (
    <>
      <div className="colum">
        <div className="colum__headline">
          <h2>{name}</h2>
          <button className={'addButton'} onClick={() => createTask(columnId)}>
            <AddTask className={`${justClickedColum === columnId ? 'justClick' : ''}`} />
            <span>add task</span>
          </button>
        </div>
        <div className="colum__scrollBlock scrollBlock">
          <Droppable droppableId={columnId} key={columnId}>
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={'scrollBlock__taskTape'}
                  style={{
                    background: snapshot.isDraggingOver ? 'lightblue' : 'transparent'
                  }}>
                  <Task
                    ToggleCommentModal={ToggleCommentModal}
                    ToggleEditModal={ToggleEditModal}
                    items={items}
                    {...provided}
                  />

                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      </div>
    </>
  );
};
