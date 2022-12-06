import React, { FC, useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ITask, taskStatus, TaskStatus } from '../../../../store/reducers/tasks/taskTypes';
import { ReactComponent as AddTask } from '../../../../assets/icons/add-svgrepo-com.svg';
import { Task } from '../../Task/Task';
import { Modal } from '../../../Modal/Modal';
import { EditTaskForm } from '../../EditTaskForm/EditTaskForm';
import { AddTaskForm } from '../../AddTaskForm/AddTaskForm';

interface IStatusBoard {
  items: ITask[];
  name: string;
  columnId: string;
}

export const StatusBoard: FC<IStatusBoard> = ({ columnId, items, name }) => {
  const [justClickedColum, setJustClickOnColum] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<taskStatus>(TaskStatus.QUEUE);

  const createTask = (arg: string) => {
    setJustClickOnColum(arg);

    setTimeout(() => setJustClickOnColum(''), 200);
    setIsOpen(true);
  };
  useEffect(() => {
    justClickedColum &&
      setStatus([TaskStatus.QUEUE, TaskStatus.DEVELOPMENT, TaskStatus.DONE][+justClickedColum - 1]);
  }, [justClickedColum]);

  const [taskId, setTaskId] = useState<number>();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const ToggleEditModal = (id?: number) => {
    if (id) {
      setTaskId(id);
      handleModal();
    } else {
      handleModal();
    }
  };

  useEffect(() => {
    !isOpen && taskId && setTaskId(undefined);
  }, [isOpen]);

  return (
    <>
      <div className="colum">
        <div className="colum__headline">
          <h2>{name}</h2>
          <button disabled={isOpen} className={'addButton'} onClick={() => createTask(columnId)}>
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
                    background: snapshot.isDraggingOver ? 'lightblue' : 'transparent',
                  }}
                >
                  <Task ToggleEditModal={ToggleEditModal} items={items} {...provided} />

                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      </div>

      <Modal setIsOpen={setIsOpen} show={isOpen}>
        {isOpen && taskId && <EditTaskForm taskId={taskId} close={ToggleEditModal} />}

        {!taskId && isOpen && <AddTaskForm status={status} close={handleModal} />}
      </Modal>
    </>
  );
};
